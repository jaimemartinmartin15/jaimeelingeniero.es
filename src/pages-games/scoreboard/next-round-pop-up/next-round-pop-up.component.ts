import { Component, EventEmitter, Input, Output } from '@angular/core';
import { transitionNextPlayer } from './next-round-pop-up.animation';
import { NextRoundPopUpInput, NextRoundPopUpOutput } from './next-round-pop-up.contract';

@Component({
  selector: 'app-next-round-pop-up',
  templateUrl: './next-round-pop-up.component.html',
  styleUrls: ['./next-round-pop-up.component.scss'],
  animations: [transitionNextPlayer],
})
export class NextRoundPopUpComponent {
  @Input()
  public nextRoundPopUpInput: NextRoundPopUpInput;

  @Output()
  public nextRoundPopUpOutput = new EventEmitter<NextRoundPopUpOutput>();

  public currentPlayer = 0;
  public sign: '+' | '-' = '+';

  public onClickKeyBoard(event: Event) {
    if (Number.isNaN(+(event.target as HTMLElement).textContent!)) {
      switch ((event.target as HTMLElement).textContent) {
        case '↩':
          this.puntuationCurrentPlayer = +`${this.puntuationCurrentPlayer}`.slice(0, -1);
          if (Number.isNaN(this.puntuationCurrentPlayer)) {
            // in case only the '-' is in the string, replace with 0
            this.puntuationCurrentPlayer = 0;
            this.sign = '+';
          }
          break;
        case '-':
          this.sign = this.sign === '-' ? '+' : '-';
          this.puntuationCurrentPlayer = -this.puntuationCurrentPlayer;
          break;
      }
    } else {
      // user pressed number key
      const key = +(event.target as HTMLElement).textContent!;
      this.puntuationCurrentPlayer = +`${this.sign}${Math.abs(this.puntuationCurrentPlayer)}${key}`;
    }
  }

  public goNextPlayer() {
    if (++this.currentPlayer == this.nextRoundPopUpInput.players.length) {
      this.nextRoundPopUpOutput.emit({
        round: this.nextRoundPopUpInput.round,
        players: this.nextRoundPopUpInput.players,
      });
      return;
    }

    this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
  }

  public goPreviousPlayer() {
    if (this.currentPlayer > 0) {
      this.currentPlayer--;
      this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
    }
  }

  public get puntuationCurrentPlayer() {
    return this.nextRoundPopUpInput.players[this.currentPlayer].punctuation;
  }

  public set puntuationCurrentPlayer(puntuation: number) {
    this.nextRoundPopUpInput.players[this.currentPlayer].punctuation = puntuation;
  }
}
