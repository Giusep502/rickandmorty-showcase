import { NgModule } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterModule,
  Routes,
} from '@angular/router';
import { CharacterPageGuard } from './characters/character-page.guard';
import { CharacterListPageComponent } from './characters/containers/character-list-page/character-list-page.component';

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
