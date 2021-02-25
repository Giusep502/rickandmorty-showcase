import { LocationsState } from '..';
import {
  LoadLocationsSuccess,
  LocationsActions,
  LocationsActionTypes,
} from './locations.actions';

export function locationsReducers(
  state: LocationsState,
  action: LocationsActions
): LocationsState {
  switch (action.type) {
    case LocationsActionTypes.LoadLocations:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LocationsActionTypes.LoadLocationsSuccess:
      return {
        loading: false,
        error: false,
        locationsData: {
          ...(state || {}).locationsData,
          ...(action as LoadLocationsSuccess).payload.locationsData.results.reduce(
            (accumulator, location) => ({
              ...accumulator,
              [location.id]: location,
            }),
            {}
          ),
        },
        locationsInfos: (action as LoadLocationsSuccess).payload.locationsData
          .info,
      };
    case LocationsActionTypes.LoadLocationsError:
      return { ...state, loading: false, error: true };
  }
}
