import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { intervalArray } from 'src/utils/arrays';
import { Player } from '../services/player/player';
import { PlayersService } from '../services/player/players.service';
import { PopUpsService } from '../services/pop-ups.service';

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
    return this.players == null || this.playersService.playedRounds === 0;
  }

  public constructor(
    public readonly playersService: PlayersService,
    public readonly changeDetectorRef: ChangeDetectorRef,
    public readonly popUpsService: PopUpsService
  ) {}

  public ngOnInit(): void {
    this.playersService.playersLoaded$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.playersService.playersById;
      this.changeDetectorRef.detectChanges();
    });

    this.playersService.scoreChanged$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.playersService.playersById;
      this.changeDetectorRef.detectChanges();
    });
  }

  public getRoundNumbersAsArray() {
    return intervalArray(this.playersService.nextRoundNumber - 1);
  }

  public getRoundScores(round: number) {
    return this.players.map((p) => p.scores[round]);
  }

  public getBackgroundColor(score: number): string {
    if (score >= 0) {
      const scorePercentile = score / this.playersService.maximumScoreInOneRound;
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(${threshold}, 255, ${threshold})`;
    } else {
      const scorePercentile = Math.abs(score) / Math.abs(this.playersService.minimumScoreInOneRound);
      const threshold = 255 - 180 * scorePercentile;
      return `background-color: rgb(255,${threshold}, ${threshold})`;
    }
  }

  public ngOnDestroy(): void {
    this.finishSubscriptions$.next();
    this.finishSubscriptions$.complete();
  }
}
