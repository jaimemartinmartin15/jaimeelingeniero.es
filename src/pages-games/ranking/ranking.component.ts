import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Player } from '../services/player/player';
import { PlayersService } from '../services/player/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingComponent implements OnInit, OnDestroy {
  private finishSubscriptions$ = new Subject<void>();

  public players: Player[];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players == null || this.playersService.playedRounds === 0;
  }

  public constructor(public readonly playersService: PlayersService, public readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.playersService.playersLoaded$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.playersService.playersRankingView;
      this.changeDetectorRef.detectChanges();
    });

    this.playersService.scoreChanged$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.playersService.playersRankingView;
      this.changeDetectorRef.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.finishSubscriptions$.next();
    this.finishSubscriptions$.complete();
  }
}
