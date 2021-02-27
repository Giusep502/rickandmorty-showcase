import {
  exampleLocation,
  exampleInitialAppStateComplete,
} from 'src/test-mocks/mocks';
import { loadLocationsSuccess } from './locations.actions';
import { locationsReducers, initialState } from './locations.reducers';

describe('Locations Reducers', () => {
  it('should properly create locations entry', () => {
    const actualExampleLocation = { ...exampleLocation, id: 1 };
    const action = loadLocationsSuccess({
      locationsData: [actualExampleLocation],
    });

    const newState = locationsReducers(
      exampleInitialAppStateComplete.locations,
      action
    );
    expect(newState).toEqual({
      ...initialState,
      locationsData: {
        1: actualExampleLocation,
        6: exampleLocation,
      },
    });
  });
});
