import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { intervalArray } from 'src/utils/arrays';
import { Player } from '../../interfaces/player';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private finishSubscriptions$ = new Subject<void>();

  public showPlayerGraphLines: boolean[];
  public showPlayersPanelInfo = false;
  public playersPanelInfoRound: number;
  public playersPanelInfoPositionMovements: number[];
  public playersPanelInfoSorted: Player[];
  public players: Player[];
  public colors: string[] = ['#ff0000', '#0000ff', '#008000', '#4cd3d3', '#804000', '#9d9d9d', '#c32aed', '#e0e000'];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players == null || this.gameService.playedRounds === 0;
  }

  public constructor(
    public readonly element: ElementRef,
    public readonly gameService: GameService,
    public readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.gameService.playersLoaded$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.gameService.playersById;
      this.createColorsForPlayers();
      this.showPlayerGraphLines = new Array(this.players.length).fill(true);
      this.changeDetectorRef.detectChanges();
    });

    this.gameService.scoreChanged$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.gameService.playersById;
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
      y: this.gameService.minimumAccumulatedScore,
      width: this.element.nativeElement.offsetWidth,
      height: this.gameService.maximumAccumulatedScore - this.gameService.minimumAccumulatedScore,
    };
  }

  public get roundSvgMarkers(): number[] {
    return intervalArray(this.gameService.playedRounds / 5);
  }

  public get playersWithMaxCurrentScore(): string {
    const maxTotalScore = Math.max(...this.players.map((p) => p.totalScore.afterRejoin));
    return this.players
      .filter((p) => p.totalScore.afterRejoin === maxTotalScore)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersWithMinCurrentScore(): string {
    const minTotalScore = Math.min(...this.players.map((p) => p.totalScore.afterRejoin));
    return this.players
      .filter((p) => p.totalScore.afterRejoin === minTotalScore)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersMaxScoreInRound(): string {
    return this.players
      .filter((p) => p.scores.indexOf(this.gameService.maximumScoreInOneRound) !== -1)
      .map((p) => p.name)
      .join(', ');
  }

  public get playersMinScoreInRound(): string {
    return this.players
      .filter((p) => p.scores.indexOf(this.gameService.minimumScoreInOneRound) !== -1)
      .map((p) => p.name)
      .join(', ');
  }

  public onClickToShowPlayersPanelInfo(event: MouseEvent) {
    // detect round
    const width = this.element.nativeElement.offsetWidth + -10;
    const clickX = event.offsetX + 5;
    const roundWidth = width / this.gameService.playedRounds;
    this.playersPanelInfoRound = Math.round(clickX / roundWidth);

    // calculate how many positions scalated
    if (this.playersPanelInfoRound > 0) {
      this.playersPanelInfoPositionMovements = [];
      const rankingRoundBefore = [...this.players].sort(
        (p1, p2) =>
          p1.accumulatedScores[this.playersPanelInfoRound - 1].afterRejoin - p2.accumulatedScores[this.playersPanelInfoRound - 1].afterRejoin
      );
      this.playersPanelInfoSorted = [...this.players].sort(
        (p1, p2) => p1.accumulatedScores[this.playersPanelInfoRound].afterRejoin - p2.accumulatedScores[this.playersPanelInfoRound].afterRejoin
      );

      rankingRoundBefore.forEach((playerBefore, position) => {
        const currentPlayer = this.playersPanelInfoSorted.find((p) => p.id === playerBefore.id)!;
        this.playersPanelInfoPositionMovements[playerBefore.id] = this.playersPanelInfoSorted.indexOf(currentPlayer) - position;
      });

      this.playersPanelInfoSorted.reverse();
    }

    this.showPlayersPanelInfo = this.playersPanelInfoRound > 0;
  }

  public ngOnDestroy(): void {
    this.finishSubscriptions$.next();
    this.finishSubscriptions$.complete();
  }
}
