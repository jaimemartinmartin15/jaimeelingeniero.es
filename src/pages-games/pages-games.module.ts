import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule],
  declarations: [ResumeGameComponent],
})
export class PagesGamesModule {}
