import { createReducer, on } from '@ngrx/store';
import { LocationsState } from '..';
import {
  loadLocations,
  loadLocationsSuccess,
  loadLocationsError,
} from './locations.actions';

export const initialState: LocationsState = {
  loading: false,
  error: false,
  locationsData: {},
};

export const locationsReducers = createReducer(
  initialState,
  on(loadLocations, (state) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(loadLocationsSuccess, (state, props) => ({
    ...state,
    loading: false,
    error: false,
    locationsData: {
      ...state.locationsData,
      ...props.locationsData.reduce(
        (accumulator, location) => ({
          ...accumulator,
          [location.id]: location,
        }),
        {}
      ),
    },
  })),
  on(loadLocationsError, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
);
