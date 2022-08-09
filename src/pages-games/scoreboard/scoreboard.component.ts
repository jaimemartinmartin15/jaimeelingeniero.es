import { Component } from '@angular/core';
import { StartGamePopUpOutput } from './start-game-pop-up/start-game-pop-up.contract';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  public showStartGamePopUp = true;
  public showNewRoundPopUp = false;

  public players: string[] = [];
  public rounds: string[][] = [];

  public getTotalScore(player: number): number {
    return this.rounds.reduce((score, round) => score + +round[player], 0);
  }

  public setFocus(round: number, player: number, e: Event) {
    (e.target as HTMLElement).style.border = '2px solid blue';
  }

  public removeFocus(e: Event) {
    (e.target as HTMLElement).style.border = '1px solid black';
  }

  public prepareTable({ players, numberOfRounds }: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;

    this.players = players;
    this.rounds = new Array(numberOfRounds).fill(new Array(this.players.length).fill(''));
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
  }
}
