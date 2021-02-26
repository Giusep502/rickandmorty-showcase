import { createReducer, on } from '@ngrx/store';
import { Character } from 'src/app/shared/models/rick-api.models';
import { getIdFromLink, getUniqueIds } from 'src/app/shared/utils';
import { CharactersState } from '..';
import {
  loadCharacters,
  loadCharactersError,
  loadCharactersSuccess,
} from './characters.actions';

const initialState: CharactersState = {
  loading: false,
  error: false,
  charactersData: {},
  charactersInfos: undefined,
};

const createCharactersData = (results: Character[]) => ({
  characters: results,
  neededEpisodesIds: getUniqueIds(
    results.reduce(
      (accumulator: string[], character) => [
        ...accumulator,
        ...character.episode.map((e: string) => getIdFromLink(e)),
      ],
      []
    )
  ),
  neededLocationIds: getUniqueIds(
    results.reduce(
      (accumulator: string[], character) => [
        ...accumulator,
        ...(character.location.name !== 'unknown'
          ? [getIdFromLink(character.location.url)]
          : []),
        ...(character.origin.name !== 'unknown'
          ? [getIdFromLink(character.origin.url)]
          : []),
      ],
      []
    )
  ),
});

export const charactersReducers = createReducer(
  initialState,
  on(loadCharacters, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(loadCharactersSuccess, (state, props) => ({
    loading: false,
    error: false,
    charactersData: {
      ...(state || {}).charactersData,
      [props.page]: createCharactersData(props.charactersData.results),
    },
    charactersInfos: props.charactersData.info,
  })),
  on(loadCharactersError, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
);
