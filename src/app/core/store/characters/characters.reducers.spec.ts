import { exampleCharacter, exampleInfos } from 'src/test-mocks/mocks';
import { loadCharactersSuccess } from './characters.actions';
import { charactersReducers, initialState } from './characters.reducers';

describe('Characters Reducers', () => {
  it('should properly create characters entry', () => {
    const action = loadCharactersSuccess({
      charactersPageData: { results: [exampleCharacter], info: exampleInfos },
      page: 1,
    });

    const newState = charactersReducers(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      charactersInfos: exampleInfos,
      charactersPageData: {
        1: {
          characters: [exampleCharacter],
          neededEpisodesIds: ['8', '9'],
          neededLocationIds: ['6', '5'],
        },
      },
    });
  });
});
