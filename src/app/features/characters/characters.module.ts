import { NgModule } from '@angular/core';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CharacterListPageComponent } from './containers/character-list-page/character-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CharacterInfoComponent, CharacterListPageComponent],
  imports: [CharactersRoutingModule, SharedModule],
})
export class CharactersModule {}
