import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { exampleInitialAppStateComplete } from 'src/test-mocks/mocks';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { loadEpisodesSuccess } from './episodes.actions';
import { EpisodesEffects } from './episodes.effects';

describe('EpisodesEffects', () => {
  let testScheduler: TestScheduler;

  let actions$ = new Observable<Action>();
  let service: EpisodesEffects;

  let apiService: { getEpisodesByIds: jasmine.Spy };

  const fakeResponse = [{ id: '8' }];

  beforeEach(() => {
    apiService = jasmine.createSpyObj('RickAndMortyApiService', {
      getEpisodesByIds: of(fakeResponse),
    });

    TestBed.configureTestingModule({
      providers: [
        EpisodesEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: exampleInitialAppStateComplete }),
        { provide: RickAndMortyApiService, useValue: apiService },
      ],
    });
    service = TestBed.inject(EpisodesEffects);
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('loads needed episodes', () =>
    testScheduler.run(({ cold, hot, expectObservable }) => {
      actions$ = hot('-a-b-', {
        a: { type: '[Episodes] Load Episodes', ids: ['9'] },
        b: { type: '[Episodes] Load Episodes', ids: ['8', '9'] },
      });

      expectObservable(service.loadEpisodes$).toBe('---a-', {
        a: loadEpisodesSuccess({ episodesData: fakeResponse as any }),
      });
    }));
});
