import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, LocationsState } from '..';

const selectLocationsState = createFeatureSelector<AppState, LocationsState>(
  'locations'
);

export const selectLocationsData = createSelector(
  selectLocationsState,
  (locationsState) => locationsState && locationsState.locationsData
);

export const selectLocationsLoadedIds = createSelector(
  selectLocationsData,
  (locationsData) => Object.keys(locationsData)
);
