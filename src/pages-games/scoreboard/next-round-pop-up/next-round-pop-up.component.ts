import { Component, EventEmitter, Input, Output } from '@angular/core';
import { transitionNextPlayer } from './next-round-pop-up.animation';

@Component({
  selector: 'app-next-round-pop-up',
  templateUrl: './next-round-pop-up.component.html',
  styleUrls: ['./next-round-pop-up.component.scss'],
  animations: [transitionNextPlayer],
})
export class NextRoundPopUpComponent {
  @Input()
  public roundNumber: number;

  @Input()
  public players: string[];

  @Output()
  public roundValues = new EventEmitter<number[]>();

  public score?: number;
  public scores: number[] = [];
  public nextPlayer = 0;

  public goNextPlayer() {
    this.scores[this.nextPlayer] = this.score!;
    this.nextPlayer++;
    this.score = undefined;
  }

  public confirmRound() {
    this.goNextPlayer();
    this.roundValues.next(this.scores);
  }
}
