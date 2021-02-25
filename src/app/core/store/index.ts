import {
  Character,
  Episode,
  Infos,
  Location,
} from 'src/app/shared/models/rick-api.models';

export interface LocationsState {
  loading: boolean;
  error: boolean;
  locationsData: { [id: string]: Location };
  locationsInfos: Infos;
}

export interface EpisodesState {
  loading: boolean;
  error: boolean;
  episodesData: { [id: string]: Episode };
  episodesInfos: Infos;
}

export interface CharactersInfo {
  characters: Character[];
  neededLocationIds: string[];
  neededEpisodesIds: string[];
}

export interface CharactersState {
  loading: boolean;
  error: boolean;
  charactersData: { [page: number]: CharactersInfo };
  charactersInfos: Infos;
}

export interface AppState {
  characters: CharactersState;
  episodes: EpisodesState;
  locations: LocationsState;
}
