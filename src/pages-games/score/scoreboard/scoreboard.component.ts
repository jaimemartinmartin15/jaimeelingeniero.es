import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { intervalArray } from 'src/utils/arrays';
import { Player } from '../player/player';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input()
  public players: Player[];

  @Output()
  public enterRound = new EventEmitter<number>();

  @Output()
  public enterPunctuationForRoundAndPlayer = new EventEmitter<{ round: number; player: number }>();

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players != null && this.players[0].scores.length === 0;
  }

  public getRoundsNumberAsArray() {
    return intervalArray(this.players[0].scores.length);
  }

  public getRoundScores(round: number) {
    return this.players.map((p) => p.scores[round]);
  }

  public getBackgroundColor(score: number): string {
    const maxScore = Math.max(...this.players.map((p) => p.scores).flatMap((r) => r));
    const minScore = Math.min(...this.players.map((p) => p.scores).flatMap((r) => r));

    if (score >= 0) {
      const scorePercentile = score / maxScore;
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(${threshold}, 255, ${threshold})`;
    } else {
      const scorePercentile = Math.abs(score) / Math.abs(minScore);
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(255,${threshold}, ${threshold})`;
    }
  }
}
