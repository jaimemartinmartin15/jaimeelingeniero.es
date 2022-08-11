import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { transitionNextPlayer } from './next-round-pop-up.animation';

@Component({
  selector: 'app-next-round-pop-up',
  templateUrl: './next-round-pop-up.component.html',
  styleUrls: ['./next-round-pop-up.component.scss'],
  animations: [transitionNextPlayer],
})
export class NextRoundPopUpComponent {
  @ViewChildren('scoreInput') private scoreInput: QueryList<ElementRef>;

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

  public ngAfterViewInit() {
    this.scoreInput.changes.subscribe((input: QueryList<ElementRef>) => {
      if (input.length > 0) {
        input.first.nativeElement.focus();
      }
    });
  }
}
