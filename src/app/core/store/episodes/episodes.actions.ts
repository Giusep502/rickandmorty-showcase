import { createAction, props } from '@ngrx/store';
import { Episode } from 'src/app/shared/models/rick-api.models';

export enum EpisodesActionTypes {
  LoadEpisodes = '[Episodes] Load Episodes',
  LoadEpisodesSuccess = '[Episodes] Load Episodes Success',
  LoadEpisodesError = '[Episodes] Load Episodes Error',
}

export const loadEpisodes = createAction(
  EpisodesActionTypes.LoadEpisodes,
  props<{ ids: string[] }>()
);

export const loadEpisodesSuccess = createAction(
  EpisodesActionTypes.LoadEpisodesSuccess,
  props<{ episodesData: Episode[] }>()
);

export const loadEpisodesError = createAction(
  EpisodesActionTypes.LoadEpisodesError
);
