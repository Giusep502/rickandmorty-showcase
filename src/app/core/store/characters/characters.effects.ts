import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import {
  loadCharacters,
  loadCharactersSuccess,
  loadCharactersError,
} from './characters.actions';

@Injectable()
export class CharactersEffects {
  constructor(
    private actions$: Actions,
    private rickAndMortyApi: RickAndMortyApiService
  ) {}

  loadCharacters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      switchMap((action) =>
        this.rickAndMortyApi.getCharactersByPage(action.page + '').pipe(
          map((charactersPageData) =>
            loadCharactersSuccess({ charactersPageData, page: action.page })
          ),
          catchError(() => of(loadCharactersError()))
        )
      )
    )
  );
}
