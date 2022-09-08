import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { intervalArray } from 'src/utils/arrays';
import { RankingPlayer } from '../ranking/player-display/ranking-player';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public colors: string[] = ['#ff0000', '#0000ff', '#008000', '#00ffff', '#c0c0c0', '#00ff00', '#ff00ff', '#ffff00'];

  @Input()
  public players: RankingPlayer[];

  public constructor(public readonly element: ElementRef) {}

  public ngOnInit(): void {
    if (this.players.length > this.colors.length) {
      const chars = '0123456789ABCDEF';
      const numberOfPlayersToCreate = this.players.length - this.colors.length;
      for (let i = 0; i < numberOfPlayersToCreate; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
          color += chars[Math.floor(Math.random() * chars.length)];
        }
        this.colors.push(color);
      }
    }

    // adds transparency
    this.colors = this.colors.map((c) => c + 'CC');
  }

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players != null && this.players[0].scores.length === 0;
  }

  public get viewBox(): any {
    // https://stackoverflow.com/a/33079812/14968065
    const points = Array.from(Array(this.players.length), () => Array.from(Array(this.players[0].scores.length + 1).fill(0)));
    this.players.forEach((player, i) => {
      player.scores.forEach((score, j) => {
        points[i][j + 1] = points[i][j] + score;
      });
    });

    const minimumScore = Math.min(...points.flatMap((p) => p));
    const maximumScore = Math.max(...points.flatMap((p) => p));

    return {
      x: 0,
      y: minimumScore,
      width: this.element.nativeElement.offsetWidth,
      height: maximumScore - minimumScore,
    };
  }

  public get roundSvgMarkers(): number[] {
    return intervalArray(this.players[0].scores.length / 5);
  }

  public buildPath(player: RankingPlayer): string {
    return player.scores.reduce((prev, _, round, scores) => {
      return `${prev} ${5 + (round + 1) * ((this.viewBox.width - 10) / player.scores.length)},${scores
        .slice(0, round + 1)
        .reduce((prev, current) => prev + current, 0)}`;
    }, 'M 0,0');
  }

  public get firstPlayers(): string {
    const maxTotalScore = Math.max(...this.players.map((p) => p.totalScore));
    return this.players
      .filter((p) => p.totalScore === maxTotalScore)
      .map((p) => p.name)
      .join(', ');
  }

  public get lastPlayers(): string {
    const minTotalScore = Math.min(...this.players.map((p) => p.totalScore));
    return this.players
      .filter((p) => p.totalScore === minTotalScore)
      .map((p) => p.name)
      .join(', ');
  }

  public get maxScoreInRound(): number {
    return Math.max(...this.players.flatMap((p) => p.scores));
  }

  public get minScoreInRound(): number {
    return Math.min(...this.players.flatMap((p) => p.scores));
  }

  public get playersMaxScoreInRound(): string {
    return this.players
      .filter((p) => p.scores.indexOf(this.maxScoreInRound) !== -1)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersMinScoreInRound(): string {
    return this.players
      .filter((p) => p.scores.indexOf(this.minScoreInRound) !== -1)
      .map((p) => p.name)
      .join(', ');
  }
}
