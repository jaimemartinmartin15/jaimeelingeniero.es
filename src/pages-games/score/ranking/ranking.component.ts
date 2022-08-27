import { Component, OnInit } from '@angular/core';
import { PREVIOUS_GAME_DATE_KEY, PREVIOUS_GAME_KEY } from '../local-storage-keys';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from '../next-round-pop-up/next-round-pop-up.contract';
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
  public showNewRoundPopUp = false;

  public rankingPlayers: RankingPlayer[];

  public nextRoundPopUpInput: NextRoundPopUpInput;

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

    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players } = JSON.parse(previousGame);
      this.rankingPlayers = players;
    }
  }

  public prepareRanking(players: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.rankingPlayers = players.map((name, id) => ({ id, name, position: 1, scores: [], totalScore: 0 }));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.rankingPlayers[0].scores.length + 1,
      players: this.rankingPlayers.map((p) => ({ ...p, punctuation: 0 })).sort((p1, p2) => p1.id - p2.id),
    };
  }

  public onResultNewRound(output: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    output.players.forEach((p1) => {
      const p2 = this.rankingPlayers.find((p2) => p1.id === p2.id)!;
      p2.scores.push(p1.punctuation);
      p2.totalScore += p1.punctuation;
    });

    this.rankingPlayers.sort((p1, p2) => p2.totalScore - p1.totalScore);
    const scores = this.rankingPlayers.map((p) => p.totalScore);
    this.rankingPlayers.forEach((player) => {
      player.position = scores.indexOf(player.totalScore) + 1;
    });

    localStorage.setItem(PREVIOUS_GAME_KEY, JSON.stringify({ players: this.rankingPlayers }));
    localStorage.setItem(PREVIOUS_GAME_DATE_KEY, JSON.stringify(Date.now()));
  }
}
