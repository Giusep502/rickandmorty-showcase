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

  it('should return true if the page is a number', () => {
    expect(guard.canActivate({ params: { page: 'test' } } as any)).toBeFalse();
  });

  it('should return true if the page is a number', () => {
    expect(guard.canActivate({ params: { page: '3' } } as any)).toBeTrue();
  });
});
