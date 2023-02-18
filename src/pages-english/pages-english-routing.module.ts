import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'alfabeto',
    loadChildren: () => import('./alphabet/alphabet.module').then((m) => m.AlphabetModule),
  },
  {
    path: 'tiempos-verbales',
    loadChildren: () => import('./tenses/tenses.module').then((m) => m.TensesModule),
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesEnglishRoutingModule {}
