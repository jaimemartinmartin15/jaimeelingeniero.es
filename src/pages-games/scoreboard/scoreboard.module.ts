import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';

@NgModule({
  imports: [CommonModule, ScoreboardRoutingModule],
  declarations: [ScoreboardComponent],
})
export class ScoreboardModule {}
