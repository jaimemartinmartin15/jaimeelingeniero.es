import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesGamesComponent } from './pages-games.component';
import { PATHS } from './paths';
import { RankingComponent } from './views/ranking/ranking.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { StatisticsComponent } from './views/statistics/statistics.component';

const noMoreChildren = [
  {
    path: '',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const routes: Routes = [
  {
    path: '',
    component: PagesGamesComponent,
    children: [
      {
        path: PATHS.RANKING,
        component: RankingComponent,
        children: noMoreChildren,
      },
      {
        path: PATHS.SCOREBOARD,
        component: ScoreboardComponent,
        children: noMoreChildren,
      },
      {
        path: PATHS.STATISTICS,
        component: StatisticsComponent,
        children: noMoreChildren,
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
