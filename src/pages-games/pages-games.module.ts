import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesGamesSvgModule } from 'src/svg/generated/pages-games-svg.module';
import { BottomControlsComponent } from './components/bottom-controls/bottom-controls.component';
import { RoundInfoComponent } from './components/round-info/round-info.component';
import { ChinchonService } from './game-services/chinchon.service';
import { GameHolderService } from './game-services/game-holder.service';
import { GameService } from './game-services/game.service';
import { OtherGameService } from './game-services/other-game.service';
import { PochaService } from './game-services/pocha.service';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { PagesGamesComponent } from './pages-games.component';
import { EnterScoreComponent } from './views/enter-score/enter-score.component';
import { GameConfigComponent } from './views/game-config/game-config.component';
import { PlayerDisplayComponent } from './views/ranking/player-display/player-display.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { ResumeGameComponent } from './views/resume-game/resume-game.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';

export const GAME_SERVICES = new InjectionToken<GameService[]>('GAME_SERVICES token');

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule, PagesGamesSvgModule, FormsModule, DragDropModule],
  declarations: [
    PagesGamesComponent,
    ResumeGameComponent,
    GameConfigComponent,
    RankingComponent,
    RoundInfoComponent,
    PlayerDisplayComponent,
    BottomControlsComponent,
    EnterScoreComponent,
    ScoreboardComponent,
  ],
  providers: [
    GameHolderService,
    { provide: GAME_SERVICES, useClass: PochaService, multi: true },
    { provide: GAME_SERVICES, useClass: ChinchonService, multi: true },
    { provide: GAME_SERVICES, useClass: OtherGameService, multi: true },
  ],
})
export class PagesGamesModule {}
