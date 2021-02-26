import { createAction, props } from '@ngrx/store';
import { WorldLocation } from 'src/app/shared/models/rick-api.models';

export enum LocationsActionTypes {
  LoadLocations = '[Locations] Load Locations',
  LoadLocationsSuccess = '[Locations] Load Locations Success',
  LoadLocationsError = '[Locations] Load Locations Error',
}

export const loadLocations = createAction(
  LocationsActionTypes.LoadLocations,
  props<{ ids: string[] }>()
);

export const loadLocationsSuccess = createAction(
  LocationsActionTypes.LoadLocationsSuccess,
  props<{ locationsData: WorldLocation[] }>()
);

export const loadLocationsError = createAction(
  LocationsActionTypes.LoadLocationsError
);
