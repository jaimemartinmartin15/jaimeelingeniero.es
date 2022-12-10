import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesGamesSvgModule } from 'src/svg/generated/pages-games-svg.module';
import { GameHolderService } from './game-services/game-holder.service';
import { GameService } from './game-services/game.service';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { GameConfigComponent } from './views/game-config/game-config.component';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';

export const GAME_SERVICES = new InjectionToken<GameService[]>('GAME_SERVICES token');

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule, PagesGamesSvgModule, FormsModule, DragDropModule],
  declarations: [ResumeGameComponent, GameConfigComponent],
  providers: [
    GameHolderService,
    // TODO provide real game services
    {
      provide: GAME_SERVICES,
      useValue: { gameName: 'Pocha', showNumberOfCardsConfig: true, numberOfCards: 40 },
      multi: true,
    },
    {
      provide: GAME_SERVICES,
      useValue: { gameName: 'Chinchon', showLimitScoreConfig: true, limitScore: 100 },
      multi: true,
    },
    {
      provide: GAME_SERVICES,
      useValue: { gameName: 'Otro', showWinnerConfig: true, winner: 'highestScore' },
      multi: true,
    },
  ],
})
export class PagesGamesModule {}
