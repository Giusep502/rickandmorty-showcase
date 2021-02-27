import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { exampleInitialAppStateComplete } from 'src/test-mocks/mocks';
import { RickAndMortyApiService } from '../../services/rick-and-morty-api.service';
import { loadLocationsSuccess } from './locations.actions';
import { LocationsEffects } from './locations.effects';

describe('LocationsEffects', () => {
  let testScheduler: TestScheduler;

  let actions$ = new Observable<Action>();
  let service: LocationsEffects;

  let apiService: { getLocationsByIds: jasmine.Spy };

  const fakeResponse = [{ id: '5' }];

  beforeEach(() => {
    apiService = jasmine.createSpyObj('RickAndMortyApiService', {
      getLocationsByIds: of(fakeResponse),
    });

    TestBed.configureTestingModule({
      providers: [
        LocationsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: exampleInitialAppStateComplete }),
        { provide: RickAndMortyApiService, useValue: apiService },
      ],
    });
    service = TestBed.inject(LocationsEffects);
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('loads needed locations', () =>
    testScheduler.run(({ cold, hot, expectObservable }) => {
      actions$ = hot('-a-b-', {
        a: { type: '[Locations] Load Locations', ids: ['6'] },
        b: { type: '[Locations] Load Locations', ids: ['5', '6'] },
      });

      expectObservable(service.loadLocations$).toBe('---a-', {
        a: loadLocationsSuccess({ locationsData: fakeResponse as any }),
      });
    }));
});
