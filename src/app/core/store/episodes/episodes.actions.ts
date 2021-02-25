import { Action } from '@ngrx/store';
import {
  DefaultResponse,
  Episode,
} from 'src/app/shared/models/rick-api.models';

export enum EpisodesActionTypes {
  LoadEpisodes = '[Episodes] Load Episodes',
  LoadEpisodesSuccess = '[Episodes] Load Episodes',
  LoadEpisodesError = '[Episodes] Load Episodes',
}

export class LoadEpisodes implements Action {
  readonly type = EpisodesActionTypes.LoadEpisodes;

  constructor(public payload: { ids: string[] }) {}
}

export class LoadEpisodesSuccess implements Action {
  readonly type = EpisodesActionTypes.LoadEpisodesSuccess;

  constructor(public payload: { episodesData: DefaultResponse<Episode> }) {}
}

export class LoadEpisodesError implements Action {
  readonly type = EpisodesActionTypes.LoadEpisodesError;
}

export type EpisodesActions =
  | LoadEpisodes
  | LoadEpisodesSuccess
  | LoadEpisodesError;
