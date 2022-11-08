import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { ScoreRoutingModule } from './score-routing.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { StartGamePopUpComponent } from '../pop-ups/start-game-pop-up/start-game-pop-up.component';
import { NextRoundPopUpComponent } from '../pop-ups/next-round-pop-up/next-round-pop-up.component';
import { RankingComponent } from './ranking/ranking.component';
import { RestartGamePopUpComponent } from '../pop-ups/restart-game-pop-up/restart-game-pop-up.component';
import { PlayerDisplayComponent } from './ranking/player-display/player-display.component';
import { ScoreComponent } from './score.component';
import { LoadNewGamePopUpComponent } from '../pop-ups/load-new-game-pop-up/load-new-game-pop-up.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { PlayersService } from './player/players.service';
import { GameConfigService } from './game/game-config.service';
import { GamePagesSvgModule } from 'src/svg/generated/game-pages-svg.module';
import { RoundInfoComponent } from './ranking/round-info/round-info.component';

@NgModule({
  imports: [FormsModule, CommonModule, ScoreRoutingModule, DragDropModule, PipesModule, GamePagesSvgModule],
  declarations: [
    ScoreComponent,
    ScoreboardComponent,
    StartGamePopUpComponent,
    NextRoundPopUpComponent,
    LoadNewGamePopUpComponent,
    RankingComponent,
    RestartGamePopUpComponent,
    PlayerDisplayComponent,
    RoundInfoComponent,
    StatisticsComponent,
  ],
  providers: [PlayersService, GameConfigService],
})
export class ScoreModule {}
