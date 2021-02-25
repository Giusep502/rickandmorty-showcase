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
  LoadLocations,
  LoadLocationsError,
  LoadLocationsSuccess,
  LocationsActionTypes,
} from './locations.actions';
import { selectLocationsLoadedIds } from './locations.selectors';

@Injectable()
export class LocationsEffects {
  constructor(
    private actions$: Actions,
    private rickAndMortyApi: RickAndMortyApiService,
    private store: Store<AppState>
  ) {}

  loadLocations$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationsActionTypes.LoadLocations),
      map((action) => action as LoadLocations),
      withLatestFrom(this.store.pipe(select(selectLocationsLoadedIds))),
      map(([action, locationIds]) =>
        action.payload.ids.filter((id) => !locationIds.includes(id))
      ),
      filter((ids) => ids.length > 0),
      switchMap((ids) => this.rickAndMortyApi.getLocations({ ids })),
      map((locationsData) => new LoadLocationsSuccess({ locationsData })),
      catchError(() => of(new LoadLocationsError()))
    )
  );
}
