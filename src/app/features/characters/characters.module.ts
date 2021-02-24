import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from '../characters-routing.module';
import { CharacterInfoComponent } from './components/character-info/character-info.component';

@NgModule({
  declarations: [CharacterInfoComponent],
  imports: [CommonModule, CharactersRoutingModule],
})
export class CharactersModule {}
