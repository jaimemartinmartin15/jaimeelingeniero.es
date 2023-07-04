import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mi-trayectoria',
    loadChildren: () => import('../pages-presentation/my-trayectory/my-trayectory.module').then((m) => m.MyTrayectoryModule),
  },
  {
    path: 'comprende-rxjs',
    loadChildren: () => import('../pages-rxjs/pages-rxjs.module').then((m) => m.PagesRxjsModule),
  },
  {
    path: 'puntuaciones',
    loadChildren: () => import('../pages-games/pages-games.module').then((m) => m.PagesGamesModule),
  },
  {
    path: 'redes',
    loadChildren: () => import('../pages-network/network.module').then((m) => m.NetworkModule),
  },
  {
    path: 'ingles',
    loadChildren: () => import('../pages-english/pages-english.module').then((m) => m.PagesEnglishModule),
  },
  {
    path: 'bases-de-datos',
    loadChildren: () => import('../pages-bbdd/bbdd.module').then((m) => m.BBDDModule),
  },
  {
    path: 'lluvias',
    loadChildren: () => import('../pages-weather/rain/rain.module').then((m) => m.RainModule),
  },
  {
    path: '',
    loadChildren: () => import('../pages-presentation/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
