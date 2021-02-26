import { createReducer, on } from '@ngrx/store';
import { EpisodesState } from '..';
import {
  loadEpisodes,
  loadEpisodesSuccess,
  loadEpisodesError,
} from './episodes.actions';

const initialState: EpisodesState = {
  loading: false,
  error: false,
  episodesData: {},
};

export const episodesReducers = createReducer(
  initialState,
  on(loadEpisodes, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(loadEpisodesSuccess, (state, props) => ({
    ...state,
    loading: false,
    error: false,
    episodesData: {
      ...state.episodesData,
      ...props.episodesData.reduce(
        (accumulator, episode) => ({
          ...accumulator,
          [episode.id]: episode,
        }),
        {}
      ),
    },
  })),
  on(loadEpisodesError, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
);
