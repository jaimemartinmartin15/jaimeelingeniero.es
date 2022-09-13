import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { intervalArray } from 'src/utils/arrays';
import { Player } from '../player/player';
import { PlayersService } from '../player/players.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  public players: Player[];
  public colors: string[] = ['#ff0000', '#0000ff', '#008000', '#00ffff', '#c0c0c0', '#00ff00', '#ff00ff', '#ffff00'];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players == null || this.playersService.playedRounds === 0;
  }

  public constructor(
    public readonly element: ElementRef,
    public readonly playersService: PlayersService,
    public readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.playersService.playersLoaded$.subscribe(() => {
      this.players = this.playersService.playersById;
      this.createColorsForPlayers();
      this.changeDetectorRef.detectChanges();
    });

    this.playersService.scoreChanged$.subscribe(() => {
      this.players = this.playersService.playersById;
      this.changeDetectorRef.detectChanges();
    });
  }

  private createColorsForPlayers() {
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

    // adds transparency to all existing colors
    this.colors = this.colors.map((c) => c + 'CC');
  }

  public buildPath(player: Player): string {
    return player.scores.reduce((prev, _, round, scores) => {
      return `${prev} ${5 + (round + 1) * ((this.viewBox.width - 10) / player.scores.length)},${scores
        .slice(0, round + 1)
        .reduce((prev, current) => prev + current, 0)}`;
    }, 'M 0,0');
  }

  public get viewBox(): any {
    return {
      x: 0,
      y: this.playersService.minimumAccumulatedScore,
      width: this.element.nativeElement.offsetWidth,
      height: this.playersService.maximumAccumulatedScore - this.playersService.minimumAccumulatedScore,
    };
  }

  public get roundSvgMarkers(): number[] {
    return intervalArray(this.playersService.playedRounds / 5);
  }

  public get playersWithMaxCurrentScore(): string {
    const maxTotalScore = Math.max(...this.players.map((p) => p.totalScore));
    return this.players
      .filter((p) => p.totalScore === maxTotalScore)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersWithMinCurrentScore(): string {
    const minTotalScore = Math.min(...this.players.map((p) => p.totalScore));
    return this.players
      .filter((p) => p.totalScore === minTotalScore)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersMaxScoreInRound(): string {
    return this.players
      .filter((p) => p.scores.indexOf(this.playersService.maximumScoreInOneRound) !== -1)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersMinScoreInRound(): string {
    return this.players
      .filter((p) => p.scores.indexOf(this.playersService.minimumScoreInOneRound) !== -1)
      .map((p) => p.name)
      .join(', ');
  }
}
