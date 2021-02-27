import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  exampleCharacter,
  exampleExtendendCharacter,
} from 'src/test-mocks/mocks';

import { CharacterInfoComponent } from './character-info.component';

describe('CharacterInfoComponent', () => {
  let component: CharacterInfoComponent;
  let fixture: ComponentFixture<CharacterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterInfoComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInfoComponent);
    component = fixture.componentInstance;
    component.character = exampleExtendendCharacter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display more than 4 episodes first, and then display episodes after click on show more', () => {
    let episodesDivs = fixture.debugElement.queryAll(By.css('.episode'));
    let showMore = fixture.debugElement.query(By.css('.caption.link'));
    expect(episodesDivs.length).toBe(4);
    expect(showMore).toBeTruthy();
    showMore.nativeElement.click();
    fixture.detectChanges();
    episodesDivs = fixture.debugElement.queryAll(By.css('.episode'));
    showMore = fixture.debugElement.query(By.css('.caption.link'));
    expect(episodesDivs.length).toBe(5);
    expect(showMore).toBeFalsy();
  });
});
