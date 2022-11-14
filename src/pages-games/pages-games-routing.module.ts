import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesGamesComponent } from './pages-games.component';
import { PATHS } from './paths';
import { RankingComponent } from './views/ranking/ranking.component';
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
    children: [
      {
        path: PATHS.RANKING,
        children: pathWithoutChildrens(RankingComponent),
      },
      {
        path: PATHS.SCOREBOARD,
        children: pathWithoutChildrens(ScoreboardComponent),
      },
      {
        path: PATHS.STATISTICS,
        children: pathWithoutChildrens(StatisticsComponent),
      },
      {
        path: '**',
        redirectTo: PATHS.RANKING,
      },
    ],
  },
  {
    path: '**',
    redirectTo: PATHS.RANKING,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesGamesRoutingModule {}
