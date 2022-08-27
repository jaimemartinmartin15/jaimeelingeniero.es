import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { FormsModule } from '@angular/forms';
import { StartGamePopUpComponent } from './start-game-pop-up/start-game-pop-up.component';
import { NextRoundPopUpComponent } from './next-round-pop-up/next-round-pop-up.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  imports: [FormsModule, CommonModule, ScoreboardRoutingModule, DragDropModule],
  declarations: [ScoreboardComponent, StartGamePopUpComponent, NextRoundPopUpComponent, RankingComponent],
})
export class ScoreboardModule {}
