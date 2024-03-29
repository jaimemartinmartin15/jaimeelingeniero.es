import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-menu/home-menu.module').then((m) => m.HomeMenuModule),
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./rxjs-layout-page/rxjs-layout-page.module').then((m) => m.RxjsLayoutPageModule),
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
export class PagesRxjsRoutingModule {}
