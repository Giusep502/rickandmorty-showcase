import { Action } from '@ngrx/store';
import {
  DefaultResponse,
  Location,
} from 'src/app/shared/models/rick-api.models';

export enum LocationsActionTypes {
  LoadLocations = '[Locations] Load Locations',
  LoadLocationsSuccess = '[Locations] Load Locations',
  LoadLocationsError = '[Locations] Load Locations',
}

export class LoadLocations implements Action {
  readonly type = LocationsActionTypes.LoadLocations;

  constructor(public payload: { ids: string[] }) {}
}

export class LoadLocationsSuccess implements Action {
  readonly type = LocationsActionTypes.LoadLocationsSuccess;

  constructor(public payload: { locationsData: DefaultResponse<Location> }) {}
}

export class LoadLocationsError implements Action {
  readonly type = LocationsActionTypes.LoadLocationsError;
}

export type LocationsActions =
  | LoadLocations
  | LoadLocationsSuccess
  | LoadLocationsError;
