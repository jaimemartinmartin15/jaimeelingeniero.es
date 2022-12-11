import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesGamesSvgModule } from 'src/svg/generated/pages-games-svg.module';
import { RoundInfoComponent } from './components/round-info/round-info.component';
import { GameHolderService } from './game-services/game-holder.service';
import { GameService } from './game-services/game.service';
import { PochaService } from './game-services/pocha.service';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { GameConfigComponent } from './views/game-config/game-config.component';
import { PlayerDisplayComponent } from './views/ranking/player-display/player-display.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';

export const GAME_SERVICES = new InjectionToken<GameService[]>('GAME_SERVICES token');

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule, PagesGamesSvgModule, FormsModule, DragDropModule],
  declarations: [ResumeGameComponent, GameConfigComponent, RankingComponent, RoundInfoComponent, PlayerDisplayComponent],
  providers: [
    GameHolderService,
    { provide: GAME_SERVICES, useClass: PochaService, multi: true },
    // TODO provide real game services
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
