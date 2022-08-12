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

  public nextNewRoundNumber: number = 0;

  public players: string[] = [];
  public rounds: number[][] = [];

  public getTotalScore(player: number): number {
    return this.rounds.reduce((score, round) => score + +round[player], 0);
  }

  public setFocus(round: number, player: number, e: Event) {
    (e.target as HTMLElement).style.border = '2px solid blue';
  }

  public removeFocus(e: Event) {
    (e.target as HTMLElement).style.border = '1px solid black';
  }

  public prepareTable(players: StartGamePopUpOutput) {
    this.showStartGamePopUp = false;

    this.players = players;
    this.rounds = [new Array(this.players.length).fill('')];
  }

  public enterNewRound() {
    this.showNewRoundPopUp = true;
    this.nextNewRoundNumber++;
  }

  public onResultNewRound(values: number[]) {
    this.showNewRoundPopUp = false;
    this.rounds[this.nextNewRoundNumber - 1] = values;
  }
}
