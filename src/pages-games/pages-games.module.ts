import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { PagesGamesSvgModule } from 'src/svg/generated/pages-games-svg.module';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { PagesGamesComponent } from './pages-games.component';
import { GameConfigService } from './services/game/game-config.service';
import { EnterPunctuationPopUpComponent } from './pop-ups/enter-punctuation-pop-up/enter-punctuation-pop-up.component';
import { PlayersService } from './services/player/players.service';
import { PlayerDisplayComponent } from './views/ranking/player-display/player-display.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { RoundInfoComponent } from './views/ranking/round-info/round-info.component';
import { ContinueGameInProgressPopUpComponent } from './pop-ups/continue-game-in-progress-pop-up/continue-game-in-progress-pop-up.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { BottomControlsComponent } from './components/bottom-controls/bottom-controls.component';
import { PopUpsService } from './services/pop-ups.service';
import { GameConfigComponent } from './views/game-config/game-config.component';
import { BottomControlsService } from './components/bottom-controls/bottom-controls.service';

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule, FormsModule, DragDropModule, PipesModule, PagesGamesSvgModule],
  declarations: [
    // parent component
    PagesGamesComponent,
    BottomControlsComponent,

    // view game config
    GameConfigComponent,

    // view ranking
    RankingComponent,
    PlayerDisplayComponent,
    RoundInfoComponent,

    // view scoretable
    ScoreboardComponent,

    // view statistics
    StatisticsComponent,

    // pop ups
    EnterPunctuationPopUpComponent,
    ContinueGameInProgressPopUpComponent,
  ],
  providers: [PlayersService, GameConfigService, PopUpsService, BottomControlsService],
})
export class PagesGamesModule {}
