import { Component, OnInit } from '@angular/core';
import { PREVIOUS_GAME_DATE_KEY } from '../local-storage-keys';
import { StartGamePopUpOutput } from '../start-game-pop-up/start-game-pop-up.contract';
import { RankingPlayer } from './player-display/ranking-player';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  public showRestartGamePopUp = false;
  public showStartGamePopUp = false;

  public rankingPlayers: RankingPlayer[];

  public ngOnInit(): void {
    if (this.checkRestartGame()) {
      return;
    }

    this.showStartGamePopUp = true;
  }

  private checkRestartGame(): boolean {
    const lastSavedGameDate = localStorage.getItem(PREVIOUS_GAME_DATE_KEY);
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    if (lastSavedGameDate != null && Date.now() - +lastSavedGameDate < twoHoursAgo) {
      this.showRestartGamePopUp = true;
      return true;
    }

    return false;
  }

  public onConfirmRestartGame(restartGame: boolean) {
    this.showRestartGamePopUp = false;

    if (!restartGame) {
      this.showStartGamePopUp = true;
      return;
    }

    // TODO restart game
  }

  public prepareRanking(players: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.rankingPlayers = players.map((name, id) => ({ id, name, position: 1, scores: [], totalScore: 0 }));
  }
}
