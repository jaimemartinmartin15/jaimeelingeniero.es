import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { transitionNextPlayer } from './next-round-pop-up.animation';

@Component({
  selector: 'app-next-round-pop-up',
  templateUrl: './next-round-pop-up.component.html',
  styleUrls: ['./next-round-pop-up.component.scss'],
  animations: [transitionNextPlayer],
})
export class NextRoundPopUpComponent implements OnInit {
  @Input()
  public roundNumber: number;

  @Input()
  public players: string[];

  @Output()
  public roundValues = new EventEmitter<number[]>();

  public scores: number[];
  public nextPlayer = 0;
  public sign: '+' | '-' = '+';

  public ngOnInit(): void {
    this.scores = new Array(this.players.length).fill(0);
  }

  public onClickKeyBoard(event: Event) {
    if (Number.isNaN(+(event.target as HTMLElement).textContent!)) {
      switch ((event.target as HTMLElement).textContent) {
        case '↩':
          this.scores[this.nextPlayer] = +`${this.scores[this.nextPlayer]}`.slice(0, -1);
          if (Number.isNaN(this.scores[this.nextPlayer])) {
            // in case only the '-' is in the string, replace with 0
            this.scores[this.nextPlayer] = 0;
            this.sign = '+';
          }
          break;
        case '-':
        case '+':
          const key = (event.target as HTMLElement).textContent!;
          this.sign = key === '+' ? '+' : '-';
          this.scores[this.nextPlayer] = -this.scores[this.nextPlayer];
          break;
      }
    } else {
      const key = Math.abs(+(event.target as HTMLElement).textContent!);
      this.scores[this.nextPlayer] = +`${this.sign}${Math.abs(this.scores[this.nextPlayer])}${key}`;
    }
  }

  public goNextPlayer() {
    if (++this.nextPlayer == this.players.length) {
      this.roundValues.next(this.scores);
      return;
    }

    this.sign = this.scores[this.nextPlayer] >= 0 ? '+' : '-';
  }

  public goPreviousPlayer() {
    if (this.nextPlayer > 0) {
      this.nextPlayer--;
      this.sign = this.scores[this.nextPlayer] >= 0 ? '+' : '-';
    }
  }
}
