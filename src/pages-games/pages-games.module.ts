import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { GameHolderService } from './game-services/game-holder.service';
import { GameService } from './game-services/game.service';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { GameConfigComponent } from './views/game-config/game-config.component';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';

export const GAME_SERVICES = new InjectionToken<GameService[]>('GAME_SERVICES token');

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule],
  declarations: [ResumeGameComponent, GameConfigComponent],
  providers: [
    GameHolderService,
    // TODO provide real game services
    { provide: GAME_SERVICES, useValue: { gameName: 'Pocha', showNumberOfCardsConfig: true, numberOfCards: 40 }, multi: true },
  ],
})
export class PagesGamesModule {}
