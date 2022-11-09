import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { PagesGamesSvgModule } from 'src/svg/generated/pages-games-svg.module';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { PagesGamesComponent } from './pages-games.component';
import { GameConfigService } from './services/game/game-config.service';
import { LoadNewGamePopUpComponent } from './pop-ups/load-new-game-pop-up/load-new-game-pop-up.component';
import { NextRoundPopUpComponent } from './pop-ups/next-round-pop-up/next-round-pop-up.component';
import { PlayersService } from './services/player/players.service';
import { PlayerDisplayComponent } from './views/ranking/player-display/player-display.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { RoundInfoComponent } from './views/ranking/round-info/round-info.component';
import { RestartGamePopUpComponent } from './pop-ups/restart-game-pop-up/restart-game-pop-up.component';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { StartGamePopUpComponent } from './pop-ups/start-game-pop-up/start-game-pop-up.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { BottomControlsComponent } from './components/bottom-controls/bottom-controls.component';
import { PopUpsService } from './services/pop-ups.service';

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule, FormsModule, DragDropModule, PipesModule, PagesGamesSvgModule],
  declarations: [
    // parent component
    PagesGamesComponent,
    BottomControlsComponent,

    // view ranking
    RankingComponent,
    PlayerDisplayComponent,
    RoundInfoComponent,

    // view scoretable
    ScoreboardComponent,

    // view statistics
    StatisticsComponent,

    // pop ups
    StartGamePopUpComponent,
    NextRoundPopUpComponent,
    LoadNewGamePopUpComponent,
    RestartGamePopUpComponent,
  ],
  providers: [PlayersService, GameConfigService, PopUpsService],
})
export class PagesGamesModule {}
