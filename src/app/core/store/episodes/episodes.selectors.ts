import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, EpisodesState } from '..';

const selectEpisodesState = createFeatureSelector<AppState, EpisodesState>(
  'episodes'
);

export const selectEpisodesData = createSelector(
  selectEpisodesState,
  (episodesState) => episodesState && episodesState.episodesData
);

export const selectEpisodesLoadedIds = createSelector(
  selectEpisodesData,
  (episodesData) => Object.keys(episodesData)
);
