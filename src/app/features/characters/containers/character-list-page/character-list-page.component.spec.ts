import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharacterInfoComponent } from '../../components/character-info/character-info.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CharacterListPageComponent } from './character-list-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  exampleCharacter,
  exampleCharactersErrorState,
  exampleEpisode,
  exampleInitialAppState,
  exampleInitialAppStateComplete,
  exampleLocation,
} from 'src/test-mocks/mocks';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { loadCharacters } from 'src/app/core/store/characters/characters.actions';
import { ExtendedCharacter } from 'src/app/core/store';
import { loadLocations } from 'src/app/core/store/locations/locations.actions';
import { loadEpisodes } from 'src/app/core/store/episodes/episodes.actions';

describe('CharacterListPageComponent', () => {
  let component: CharacterListPageComponent;
  let fixture: ComponentFixture<CharacterListPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterInfoComponent, CharacterListPageComponent],
      imports: [CommonModule, SharedModule, RouterTestingModule],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ page: 1 }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    spyOn(store, 'dispatch');
    spyOn(window, 'scrollTo');
    fixture = TestBed.createComponent(CharacterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called initial functions', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadCharacters({ page: 1 }));
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should visualize all the information when available', () => {
    store.setState(exampleInitialAppState);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.character-card'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.paginator-container'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(
        (el) => el.nativeElement.getAttribute('src') === 'assets/error.png'
      )
    ).toBeFalsy();
  });

  it('should map correct page infos', (done) => {
    store.setState(exampleInitialAppState);
    component.pagesInfo$.subscribe((pages) => {
      expect(pages.currentPage).toBe(1);
      expect(pages.totalPages).toBe(34);
      done();
    });
  });

  it('should map correct character infos', (done) => {
    store.setState(exampleInitialAppState);
    component.characters$.subscribe((characters) => {
      expect(characters && characters[0]).toEqual({
        ...exampleCharacter,
        extendedLocation: undefined,
        extendedOrigin: undefined,
        extendedEpisodes: [],
      });
      done();
    });
  });

  it('should extend character and call location and episode remaining loading', (done) => {
    store.setState(exampleInitialAppStateComplete);
    expect(store.dispatch).toHaveBeenCalledWith(
      loadLocations({ ids: ['5', '6'] })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      loadEpisodes({ ids: ['8', '9'] })
    );
    component.characters$.subscribe((characters) => {
      expect(characters && characters[0]).toEqual({
        ...exampleCharacter,
        extendedLocation: exampleLocation,
        extendedOrigin: undefined,
        extendedEpisodes: [exampleEpisode],
      });
      done();
    });
  });

  it('should change page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.goToPage(2);
    expect(router.navigate).toHaveBeenCalledWith(['characters', 2]);
  });

  it('should handle error', () => {
    store.setState(exampleCharactersErrorState);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.character-card'))).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.paginator-container'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(
        (el) => el.nativeElement.getAttribute('src') === 'assets/error.png'
      )
    ).toBeTruthy();
  });
});
