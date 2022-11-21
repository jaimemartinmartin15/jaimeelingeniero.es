import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { intervalArray } from 'src/utils/arrays';
import { Player } from '../../interfaces/player';
import { GameService } from '../../services/game.service';
import { PopUpsService } from '../../services/pop-ups.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  private finishSubscriptions$ = new Subject<void>();

  public players: Player[];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players == null || this.gameService.playedRounds === 0;
  }

  public constructor(
    public readonly gameService: GameService,
    public readonly changeDetectorRef: ChangeDetectorRef,
    public readonly popUpsService: PopUpsService
  ) {}

  public ngOnInit(): void {
    this.gameService.playersLoaded$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.gameService.playersById;
      this.changeDetectorRef.detectChanges();
    });

    this.gameService.scoreChanged$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.gameService.playersById;
      this.changeDetectorRef.detectChanges();
    });
  }

  public getRoundNumbersAsArray() {
    return intervalArray(this.gameService.nextRoundNumber - 1);
  }

  public getRoundScores(round: number) {
    return this.players.map((p) => p.scores[round]);
  }

  public getBackgroundColor(score: number): string {
    if (score >= 0) {
      const scorePercentile = score / this.gameService.maximumScoreInOneRound;
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(${threshold}, 255, ${threshold})`;
    } else {
      const scorePercentile = Math.abs(score) / Math.abs(this.gameService.minimumScoreInOneRound);
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(255,${threshold}, ${threshold})`;
    }
  }

  public showRejoinRowAfterRound(round: number): boolean {
    return this.players.some((p) => p.rejoins.some((r) => r.afterRound === round));
  }

  public getRejoinScores(round: number): number[] {
    const rejoinsRound = this.players.map((p) => p.rejoins.filter((r) => r.afterRound === round));
    return rejoinsRound.map((r) => (r.length === 0 ? 0 : r[0].substractScore));
  }

  public ngOnDestroy(): void {
    this.finishSubscriptions$.next();
    this.finishSubscriptions$.complete();
  }
}
