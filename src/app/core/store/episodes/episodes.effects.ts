import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AppState } from '..';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import {
  LoadEpisodes,
  LoadEpisodesError,
  LoadEpisodesSuccess,
  EpisodesActionTypes,
} from './episodes.actions';
import { selectEpisodesLoadedIds } from './episodes.selectors';

@Injectable()
export class EpisodesEffects {
  constructor(
    private actions$: Actions,
    private rickAndMortyApi: RickAndMortyApiService,
    private store: Store<AppState>
  ) {}

  loadEpisodes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodesActionTypes.LoadEpisodes),
      map((action) => action as LoadEpisodes),
      withLatestFrom(this.store.pipe(select(selectEpisodesLoadedIds))),
      map(([action, episodeIds]) =>
        action.payload.ids.filter((id) => !episodeIds.includes(id))
      ),
      filter((ids) => ids.length > 0),
      switchMap((ids) => this.rickAndMortyApi.getEpisodes({ ids })),
      map((episodesData) => new LoadEpisodesSuccess({ episodesData })),
      catchError(() => of(new LoadEpisodesError()))
    )
  );
}
