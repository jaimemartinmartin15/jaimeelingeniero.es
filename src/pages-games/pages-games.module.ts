import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { GameHolderService } from './game-services/game-holder.service';
import { GameService } from './game-services/game.service';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';

export const GAME_SERVICES = new InjectionToken<GameService[]>('GAME_SERVICES token');

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule],
  declarations: [ResumeGameComponent],
  providers: [GameHolderService, { provide: GAME_SERVICES, useValue: { gameName: 'Pocha' }, multi: true }], // TODO provide real game services
})
export class PagesGamesModule {}
