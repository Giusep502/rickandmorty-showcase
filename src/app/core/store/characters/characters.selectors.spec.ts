import {
  exampleCharacter,
  exampleEpisode,
  exampleInitialAppStateComplete,
  exampleLocation,
} from 'src/test-mocks/mocks';
import { selectExtendedCharactersDataForPage } from './characters.selectors';

describe('Characters Selectors', () => {
  it('should properly select characters extended infos', () => {
    const extendedCharactersInfo = selectExtendedCharactersDataForPage.projector(
      exampleInitialAppStateComplete.characters.charactersPageData[1]
        .characters,
      exampleInitialAppStateComplete.locations.locationsData,
      exampleInitialAppStateComplete.episodes.episodesData
    );

    expect(extendedCharactersInfo).toEqual([
      {
        ...exampleCharacter,
        extendedLocation: exampleLocation,
        extendedOrigin: undefined,
        extendedEpisodes: [exampleEpisode],
      },
    ]);
  });
});
