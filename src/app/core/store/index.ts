import {
  Character,
  Episode,
  Infos,
  WorldLocation,
} from 'src/app/shared/models/rick-api.models';
import { CharactersEffects } from './characters/characters.effects';
import { charactersReducers } from './characters/characters.reducers';
import { EpisodesEffects } from './episodes/episodes.effects';
import { episodesReducers } from './episodes/episodes.reducers';
import { LocationsEffects } from './locations/locations.effects';
import { locationsReducers } from './locations/locations.reducers';

export interface ExtendedCharacter extends Character {
  extendedLocation: WorldLocation;
  extendedOrigin: WorldLocation;
  extendedEpisodes: Episode[];
}

export interface LocationsState {
  loading: boolean;
  error: boolean;
  locationsData: { [id: string]: WorldLocation };
}

export interface EpisodesState {
  loading: boolean;
  error: boolean;
  episodesData: { [id: string]: Episode };
}

export interface CharactersInfo {
  characters: Character[];
  neededLocationIds: string[];
  neededEpisodesIds: string[];
}

export interface CharactersState {
  loading: boolean;
  error: boolean;
  charactersPageData: { [page: number]: CharactersInfo };
  charactersInfos?: Infos;
}

export interface AppState {
  characters: CharactersState;
  episodes: EpisodesState;
  locations: LocationsState;
}

export const rootReducers = {
  characters: charactersReducers,
  episodes: episodesReducers,
  locations: locationsReducers,
};

export const rootEffects = [
  CharactersEffects,
  LocationsEffects,
  EpisodesEffects,
];
