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
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AppState, ExtendedCharacter } from 'src/app/core/store';
import { loadCharacters } from 'src/app/core/store/characters/characters.actions';
import {
  selectCharactersError,
  selectCharactersInfo,
  selectCharactersNeededEpisodesForPage,
  selectCharactersNeededLocationsForPage,
  selectExtendedCharactersDataForPage,
} from 'src/app/core/store/characters/characters.selectors';
import { loadEpisodes } from 'src/app/core/store/episodes/episodes.actions';
import { loadLocations } from 'src/app/core/store/locations/locations.actions';
import { Infos } from 'src/app/shared/models/rick-api.models';

@Component({
  selector: 'app-character-list-page',
  templateUrl: './character-list-page.component.html',
  styleUrls: ['./character-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListPageComponent implements OnInit, OnDestroy {
  characters$: Observable<ExtendedCharacter[] | undefined>;
  charactersError$: Observable<boolean>;
  pagesInfo$: Observable<{ totalPages: number; currentPage: number }>;
  private subscriptions = new Subscription();

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.characters$ = this.activatedRoute.params.pipe(
      tap(() => window.scrollTo({ top: 0 })),
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
    this.charactersError$ = this.store.pipe(select(selectCharactersError));
    this.pagesInfo$ = combineLatest([
      this.activatedRoute.params,
      this.store.pipe(select(selectCharactersInfo)),
    ]).pipe(
      filter(([params, infos]) => !!params.page && !!infos),
      map(([params, infos]) => ({
        totalPages: (infos as Infos).pages,
        currentPage: +params.page,
      }))
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
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

  goToPage(page: number): void {
    this.router.navigate(['characters', page]);
  }
}
