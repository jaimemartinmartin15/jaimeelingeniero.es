import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesGamesComponent } from './pages-games.component';

const routes: Routes = [
  {
    path: '',
    component: PagesGamesComponent,
    title: 'Puntuaciones',
    data: {
      metaTags: {
        description:
          'Utiliza esta aplicación cuando estes jugando a las cartas con amigos o la familia y anota las puntuaciones para saber quién gana. Obtén estadísticas y bonitos gráficos.',
        keywords: ['tabla', 'puntuaciones', 'cartas', 'juego', 'online', 'ranking', 'clasificacion'],
      },
    },
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
export class PagesGamesRoutingModule {}
