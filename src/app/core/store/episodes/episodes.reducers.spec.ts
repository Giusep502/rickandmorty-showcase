import {
  exampleEpisode,
  exampleInitialAppStateComplete,
} from 'src/test-mocks/mocks';
import { loadEpisodesSuccess } from './episodes.actions';
import { episodesReducers, initialState } from './episodes.reducers';

describe('Episodes Reducers', () => {
  it('should properly create episodes entry', () => {
    const actualExampleEpisode = { ...exampleEpisode, id: 1 };
    const action = loadEpisodesSuccess({
      episodesData: [actualExampleEpisode],
    });

    const newState = episodesReducers(
      exampleInitialAppStateComplete.episodes,
      action
    );
    expect(newState).toEqual({
      ...initialState,
      episodesData: {
        1: actualExampleEpisode,
        9: exampleEpisode,
      },
    });
  });
});
