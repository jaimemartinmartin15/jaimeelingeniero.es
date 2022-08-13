import { Component } from '@angular/core';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from './next-round-pop-up/next-round-pop-up.contract';
import { Player } from './player';
import { StartGamePopUpOutput } from './start-game-pop-up/start-game-pop-up.contract';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  public showStartGamePopUp = true;
  public showNewRoundPopUp = false;

  public nextRoundPopUpInput: NextRoundPopUpInput;

  public players: Player[];
  public rounds: number[][] = [];

  public getTotalScore(player: number): number {
    return this.rounds.reduce((score, round) => score + round[player], 0);
  }

  public prepareTable(players: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;
    this.players = players.map((name, id) => ({ name, id }));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: this.rounds.length + 1,
      players: this.players.map((p) => ({ ...p, punctuation: 0 })),
    };
  }

  public enterRound(round: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: this.players.map((p, i) => ({ ...p, punctuation: this.rounds[round][i] })),
    };
  }

  public enterPunctuationForRoundAndPlayer(round: number, player: number) {
    this.showNewRoundPopUp = true;
    this.nextRoundPopUpInput = {
      round: round + 1,
      players: [{ ...this.players[player], punctuation: this.rounds[round][player] }],
    };
  }

  public onResultNewRound(output: NextRoundPopUpOutput) {
    this.showNewRoundPopUp = false;
    const round = output.round - 1;
    if (this.rounds[round] == undefined) {
      this.rounds[round] = new Array(this.players.length);
    }
    output.players.forEach((player) => (this.rounds[round][player.id] = player.punctuation));
  }

  public getPosition(playerId: number): number {
    const scores = this.rounds.reduce((prev, current) => prev.map((p, i) => p + current[i]), new Array(this.players.length).fill(0));
    const sortScores = [...scores].sort((a, b) => a - b);
    return sortScores.reverse().indexOf(scores[playerId]) + 1;
  }
}
