import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { PagesGamesSvgModule } from 'src/svg/generated/pages-games-svg.module';
import { PagesGamesRoutingModule } from './pages-games-routing.module';
import { PagesGamesComponent } from './pages-games.component';
import { GameConfigService } from './score/game/game-config.service';
import { LoadNewGamePopUpComponent } from './score/load-new-game-pop-up/load-new-game-pop-up.component';
import { NextRoundPopUpComponent } from './score/next-round-pop-up/next-round-pop-up.component';
import { PlayersService } from './score/player/players.service';
import { PlayerDisplayComponent } from './score/ranking/player-display/player-display.component';
import { RankingComponent } from './score/ranking/ranking.component';
import { RoundInfoComponent } from './score/ranking/round-info/round-info.component';
import { RestartGamePopUpComponent } from './score/restart-game-pop-up/restart-game-pop-up.component';
import { ScoreboardComponent } from './score/scoreboard/scoreboard.component';
import { StartGamePopUpComponent } from './score/start-game-pop-up/start-game-pop-up.component';
import { StatisticsComponent } from './score/statistics/statistics.component';

@NgModule({
  imports: [CommonModule, PagesGamesRoutingModule, FormsModule, DragDropModule, PipesModule, PagesGamesSvgModule],
  declarations: [
    // parent component
    PagesGamesComponent,

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
  providers: [PlayersService, GameConfigService],
})
export class PagesGamesModule {}
