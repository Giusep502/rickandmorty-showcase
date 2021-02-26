import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getIdFromLink } from 'src/app/shared/utils';
import {
  AppState,
  CharactersInfo,
  CharactersState,
  ExtendedCharacter,
} from '..';
import { selectEpisodesData } from '../episodes/episodes.selectors';
import { selectLocationsData } from '../locations/locations.selectors';

const selectCharactersState = createFeatureSelector<AppState, CharactersState>(
  'characters'
);

export const selectCharactersData = createSelector(
  selectCharactersState,
  (charactersState) => charactersState && charactersState.charactersData
);

export const selectCharactersInfo = createSelector(
  selectCharactersState,
  (charactersState) => charactersState && charactersState.charactersInfos
);

export const selectCharactersInfoForPage = createSelector(
  selectCharactersData,
  (charactersData: { [x: string]: CharactersInfo }, page: number) =>
    !!charactersData && charactersData[page]
);

export const selectCharactersDataForPage = createSelector(
  selectCharactersInfoForPage,
  (charactersInfo) => !!charactersInfo && charactersInfo.characters
);

export const selectCharactersNeededLocationsForPage = createSelector(
  selectCharactersInfoForPage,
  (charactersInfo) => !!charactersInfo && charactersInfo.neededLocationIds
);

export const selectCharactersNeededEpisodesForPage = createSelector(
  selectCharactersInfoForPage,
  (charactersInfo) => !!charactersInfo && charactersInfo.neededEpisodesIds
);

export const selectExtendedCharactersDataForPage = createSelector(
  selectCharactersDataForPage,
  selectLocationsData,
  selectEpisodesData,
  (characters, locations, episodes): ExtendedCharacter[] | undefined =>
    !!characters
      ? characters.map((character) => ({
          ...character,
          extendedLocation: locations[getIdFromLink(character.location.url)],
          extendedOrigin: locations[getIdFromLink(character.origin.url)],
          extendedEpisodes: character.episode
            .map((episode) => episodes[getIdFromLink(episode)])
            .filter((episode) => !!episode),
        }))
      : undefined
);
