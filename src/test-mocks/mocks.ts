import { AppState } from 'src/app/core/store';
import { initialState as initialLocationState } from 'src/app/core/store/locations/locations.reducers';
import { initialState as initialEpisodesState } from 'src/app/core/store/episodes/episodes.reducers';
import { initialState as initialCharactersState } from 'src/app/core/store/characters/characters.reducers';
import {
  CharacterGender,
  CharacterStatus,
} from 'src/app/shared/models/rick-api.models';

export const exampleEpisode = {
  id: 9,
  name: 'Rixty Minutes',
  air_date: 'March 17, 2014',
  episode: 'S01E08',
  characters: ['https://rickandmortyapi.com/api/character/1'],
  url: 'https://rickandmortyapi.com/api/episode/8',
  created: '2017-11-10T12:56:34.543Z',
};

export const exampleLocation = {
  id: 6,
  name: 'milano',
  type: 'world',
  dimension: 'earth',
  residents: [],
  url: '',
  created: '',
};

export const exampleCharacter = {
  id: 20,
  name: 'Ants in my Eyes Johnson',
  status: 'unknown' as CharacterStatus,
  species: 'Human',
  type: 'Human with ants in his eyes',
  gender: 'Male' as CharacterGender,
  origin: {
    name: 'unknown',
    url: 'https://rickandmortyapi.com/api/location/5',
  },
  location: {
    name: 'Interdimensional Cable',
    url: 'https://rickandmortyapi.com/api/location/6',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/8',
    'https://rickandmortyapi.com/api/episode/9',
  ],
  url: '',
  created: '',
};

export const exampleExtendendCharacter = {
  ...exampleCharacter,
  extendedEpisodes: [
    exampleEpisode,
    exampleEpisode,
    exampleEpisode,
    exampleEpisode,
    exampleEpisode,
  ],
};

export const exampleInitialAppState: AppState = {
  locations: initialLocationState,
  episodes: initialEpisodesState,
  characters: {
    ...initialCharactersState,
    charactersPageData: {
      1: {
        characters: [exampleCharacter],
        neededEpisodesIds: [],
        neededLocationIds: [],
      },
    },
    charactersInfos: {
      count: 1,
      pages: 34,
      next: '',
      prev: '',
    },
  },
};

export const exampleInitialAppStateComplete: AppState = {
  locations: {
    ...initialLocationState,
    locationsData: {
      6: exampleLocation,
    },
  },
  episodes: {
    ...initialEpisodesState,
    episodesData: {
      9: exampleEpisode,
    },
  },
  characters: {
    ...initialCharactersState,
    charactersPageData: {
      1: {
        characters: [exampleCharacter],
        neededEpisodesIds: ['8', '9'],
        neededLocationIds: ['5', '6'],
      },
    },
    charactersInfos: {
      count: 1,
      pages: 34,
      next: '',
      prev: '',
    },
  },
};
