import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlphabetComponent } from './alphabet/alphabet.component';

const routes: Routes = [
  {
    path: 'alfabeto',
    title: 'Alfabeto inglés',
    component: AlphabetComponent,
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: '**',
    redirectTo: 'alfabeto',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesEnglishRoutingModule {}
