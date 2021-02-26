import { TestBed } from '@angular/core/testing';
import { CharacterPageGuard } from './character-page.guard';

describe('CharacterPageGuard', () => {
  let guard: CharacterPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CharacterPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
