import { Component, Input } from '@angular/core';
import { intervalArray } from 'src/utils/arrays';
import { RankingPlayer } from '../ranking/player-display/ranking-player';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input()
  public players: RankingPlayer[];

  public getRoundsNumberAsArray() {
    return intervalArray(this.players[0].scores.length);
  }

  public getRoundScores(round: number) {
    return this.players.map((p) => p.scores[round]);
  }

  public enterRound(round: number) {
    // TODO
  }

  public enterPunctuationForRoundAndPlayer(round: number, player: number) {
    // TODO
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
