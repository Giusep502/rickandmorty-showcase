import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () =>
      import('./features/characters/characters.module').then(
        (m) => m.CharactersModule
      ),
  },
  { path: '**', redirectTo: 'characters/1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CoreModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
