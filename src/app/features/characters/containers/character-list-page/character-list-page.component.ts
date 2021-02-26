import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { AppState, ExtendedCharacter } from 'src/app/core/store';
import { loadCharacters } from 'src/app/core/store/characters/characters.actions';
import {
  selectCharactersNeededEpisodesForPage,
  selectCharactersNeededLocationsForPage,
  selectExtendedCharactersDataForPage,
} from 'src/app/core/store/characters/characters.selectors';
import { loadEpisodes } from 'src/app/core/store/episodes/episodes.actions';
import { loadLocations } from 'src/app/core/store/locations/locations.actions';

@Component({
  selector: 'app-character-list-page',
  templateUrl: './character-list-page.component.html',
  styleUrls: ['./character-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListPageComponent implements OnInit, OnDestroy {
  characters$: Observable<ExtendedCharacter[] | undefined>;
  private subscriptions = new Subscription();

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.characters$ = this.activatedRoute.params.pipe(
      tap(() => window.scrollTo({ top: 0, behavior: 'smooth' })),
      switchMap((params) =>
        this.store.pipe(
          select(selectExtendedCharactersDataForPage, params.page),
          tap(
            (characters) =>
              !characters &&
              this.store.dispatch(loadCharacters({ page: params.page }))
          )
        )
      )
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params) => isNaN(params.page) && this.goToPage(1)),
        filter((params) => !isNaN(params.page)),
        switchMap((params) =>
          combineLatest([
            this.store.pipe(
              select(selectCharactersNeededEpisodesForPage, params.page),
              distinctUntilChanged(),
              filter((episodes) => !!episodes && episodes.length > 0),
              tap((episodes) =>
                this.store.dispatch(loadEpisodes({ ids: episodes }))
              )
            ),
            this.store.pipe(
              select(selectCharactersNeededLocationsForPage, params.page),
              distinctUntilChanged(),
              filter((locations) => !!locations && locations.length > 0),
              tap((locations) =>
                this.store.dispatch(loadLocations({ ids: locations }))
              )
            ),
          ])
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  nextPage(): void {
    this.goToPage(+this.activatedRoute.snapshot.params.page + 1);
  }

  goToPage(page: number): void {
    this.router.navigate(['characters', page]);
  }
}
