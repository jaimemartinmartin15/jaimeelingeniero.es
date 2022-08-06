import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mi-trayectoria',
    loadChildren: () => import('../pages/my-trayectory/my-trayectory.module').then((m) => m.MyTrayectoryModule),
  },
  {
    path: 'comprende-rxjs',
    loadChildren: () => import('../pages-rxjs/pages-rxjs.module').then((m) => m.PagesRxjsModule),
  },
  {
    path: 'tabla-de-puntuaciones',
    loadChildren: () => import('../pages-games/scoreboard/scoreboard.module').then((m) => m.ScoreboardModule),
  },
  {
    path: '',
    loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
