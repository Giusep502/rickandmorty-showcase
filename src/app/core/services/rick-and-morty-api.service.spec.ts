import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RickAndMortyApiService } from './rick-and-morty-api.service';

describe('RickAndMortyApiService', () => {
  let service: RickAndMortyApiService;
  let http: { get: jasmine.Spy };
  const obj = {};

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', { get: of(obj) });
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: http }],
    });
    service = TestBed.inject(RickAndMortyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call characters api correctly', () => {
    service.getCharactersByPage('1').subscribe();
    expect(http.get).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/',
      {
        params: { page: '1' },
      }
    );
  });

  it('should call locations api correctly', (done) => {
    service.getLocationsByIds(['1']).subscribe((locations) => {
      expect(http.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/location/1'
      );
      expect(locations[0]).toBe(obj as any);
      done();
    });
  });

  it('should call episodes api correctly', (done) => {
    service.getEpisodesByIds(['1']).subscribe((episodes) => {
      expect(http.get).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/episode/1'
      );
      expect(episodes[0]).toBe(obj as any);
      done();
    });
  });
});
