import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesGamesNavigationGuard } from './pages-games-navigation.guard';
import { PagesGamesComponent } from './pages-games.component';
import { ROUTING_PATHS } from './routing-paths';
import { EnterScoreComponent } from './views/enter-score/enter-score.component';
import { GameConfigComponent } from './views/game-config/game-config.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { StatisticsComponent } from './views/statistics/statistics.component';

const pathWithoutChildrens = (component: Type<any>): Routes => {
  return [
    {
      path: '',
      component,
    },
    {
      path: '**',
      redirectTo: '',
    },
  ];
};

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
        favIcon: 'assets/favicons/puntuaciones/favicon-{size}x{size}.png',
      },
    },
    canActivateChild: [PagesGamesNavigationGuard],
    children: [
      {
        path: ROUTING_PATHS.RESUME_GAME,
        children: pathWithoutChildrens(ResumeGameComponent),
      },
      {
        path: ROUTING_PATHS.GAME_CONFIG,
        children: pathWithoutChildrens(GameConfigComponent),
      },
      {
        path: ROUTING_PATHS.ENTER_SCORE,
        children: pathWithoutChildrens(EnterScoreComponent),
      },
      {
        path: ROUTING_PATHS.RANKING,
        children: pathWithoutChildrens(RankingComponent),
      },
      {
        path: ROUTING_PATHS.SCOREBOARD,
        children: pathWithoutChildrens(ScoreboardComponent),
      },
      {
        path: ROUTING_PATHS.STATISTICS,
        children: pathWithoutChildrens(StatisticsComponent),
      },
      {
        path: '**',
        redirectTo: ROUTING_PATHS.GAME_CONFIG,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [PagesGamesNavigationGuard],
  exports: [RouterModule],
})
export class PagesGamesRoutingModule {}
