import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterPageGuard } from './character-page.guard';
import { CharacterListPageComponent } from './containers/character-list-page/character-list-page.component';

const routes: Routes = [
  {
    path: ':page',
    component: CharacterListPageComponent,
    canActivate: [CharacterPageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
