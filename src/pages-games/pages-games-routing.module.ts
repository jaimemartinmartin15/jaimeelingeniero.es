import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesGamesComponent } from './pages-games.component';
import { RankingComponent } from './ranking/ranking.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { StatisticsComponent } from './statistics/statistics.component';

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
        path: 'ranking',
        component: RankingComponent,
        children: noMoreChildren,
      },
      {
        path: 'tabla',
        component: ScoreboardComponent,
        children: noMoreChildren,
      },
      {
        path: 'estadisticas',
        component: StatisticsComponent,
        children: noMoreChildren,
      },
      {
        path: '**',
        redirectTo: 'ranking',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'ranking',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesGamesRoutingModule {}
