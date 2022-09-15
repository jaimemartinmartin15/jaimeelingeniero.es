import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ScoreRoutingModule } from './score-routing.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { StartGamePopUpComponent } from './start-game-pop-up/start-game-pop-up.component';
import { NextRoundPopUpComponent } from './next-round-pop-up/next-round-pop-up.component';
import { RankingComponent } from './ranking/ranking.component';
import { RestartGamePopUpComponent } from './restart-game-pop-up/restart-game-pop-up.component';
import { PlayerDisplayComponent } from './ranking/player-display/player-display.component';
import { ScoreComponent } from './score.component';
import { LoadNewGamePopUpComponent } from './load-new-game-pop-up/load-new-game-pop-up.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [FormsModule, CommonModule, ScoreRoutingModule, DragDropModule, PipesModule],
  declarations: [
    ScoreComponent,
    ScoreboardComponent,
    StartGamePopUpComponent,
    NextRoundPopUpComponent,
    LoadNewGamePopUpComponent,
    RankingComponent,
    RestartGamePopUpComponent,
    PlayerDisplayComponent,
    StatisticsComponent,
  ],
})
export class ScoreModule {}
