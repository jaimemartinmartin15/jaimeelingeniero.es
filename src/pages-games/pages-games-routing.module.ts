import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTING_PATHS } from './routing-paths';
import { PagesGamesNavigationGuard } from './pages-games-navigation.guard';

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
    canActivateChild: [PagesGamesNavigationGuard],
    children: [
      {
        path: ROUTING_PATHS.RESUME_GAME,
        children: pathWithoutChildrens(ResumeGameComponent),
      },
      {
        path: ROUTING_PATHS.ENTER_SCORE,
        children: pathWithoutChildrens(EnterScoreComponent),
      },
      {
        path: ROUTING_PATHS.GAME_CONFIG,
        children: pathWithoutChildrens(GameConfigComponent),
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
  exports: [RouterModule],
})
export class PagesGamesRoutingModule {}
