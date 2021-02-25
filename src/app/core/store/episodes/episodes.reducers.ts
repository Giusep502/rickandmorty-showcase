import { EpisodesState } from '..';
import {
  LoadEpisodesSuccess,
  EpisodesActions,
  EpisodesActionTypes,
} from './episodes.actions';

export function episodesReducers(
  state: EpisodesState,
  action: EpisodesActions
): EpisodesState {
  switch (action.type) {
    case EpisodesActionTypes.LoadEpisodes:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EpisodesActionTypes.LoadEpisodesSuccess:
      return {
        loading: false,
        error: false,
        episodesData: {
          ...(state || {}).episodesData,
          ...(action as LoadEpisodesSuccess).payload.episodesData.results.reduce(
            (accumulator, episode) => ({
              ...accumulator,
              [episode.id]: episode,
            }),
            {}
          ),
        },
        episodesInfos: (action as LoadEpisodesSuccess).payload.episodesData
          .info,
      };
    case EpisodesActionTypes.LoadEpisodesError:
      return { ...state, loading: false, error: true };
  }
}
