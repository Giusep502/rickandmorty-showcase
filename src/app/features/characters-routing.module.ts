import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListPageComponent } from './characters/containers/character-list-page/character-list-page.component';

const routes: Routes = [
  {
    path: ':page',
    component: CharacterListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
