import { createAction, props } from '@ngrx/store';
import {
  Character,
  DefaultResponse,
} from 'src/app/shared/models/rick-api.models';

export enum CharactersActionTypes {
  LoadCharacters = '[Characters] Load Characters',
  LoadCharactersSuccess = '[Characters] Load Characters Success',
  LoadCharactersError = '[Characters] Load Characters Error',
}

export const loadCharacters = createAction(
  CharactersActionTypes.LoadCharacters,
  props<{ page: number }>()
);

export const loadCharactersSuccess = createAction(
  CharactersActionTypes.LoadCharactersSuccess,
  props<{ charactersPageData: DefaultResponse<Character>; page: number }>()
);

export const loadCharactersError = createAction(
  CharactersActionTypes.LoadCharactersError
);
