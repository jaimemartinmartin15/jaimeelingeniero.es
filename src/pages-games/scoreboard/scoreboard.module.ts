import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { FormsModule } from '@angular/forms';
import { StartGamePopUpComponent } from './start-game-pop-up/start-game-pop-up.component';

@NgModule({
  imports: [FormsModule, CommonModule, ScoreboardRoutingModule],
  declarations: [ScoreboardComponent, StartGamePopUpComponent],
})
export class ScoreboardModule {}
