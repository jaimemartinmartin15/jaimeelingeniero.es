import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GameConfigService } from '../game/game-config.service';
import { pochaConfig } from '../game/game-configs/pocha-config';
import { Player } from '../player/player';
import { PlayersService } from '../player/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingComponent implements OnInit, OnDestroy {
  public pochaConfig = pochaConfig;
  private finishSubscriptions$ = new Subject<void>();

  public players: Player[];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players == null || this.playersService.playedRounds === 0;
  }

  public constructor(
    public readonly playersService: PlayersService,
    public readonly changeDetectorRef: ChangeDetectorRef,
    public readonly gameConfigService: GameConfigService
  ) {}

  public ngOnInit(): void {
    this.playersService.playersLoaded$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.playersService.playersByPosition;
      this.changeDetectorRef.detectChanges();
    });

    this.playersService.scoreChanged$.pipe(takeUntil(this.finishSubscriptions$)).subscribe(() => {
      this.players = this.playersService.playersByPosition;
      this.changeDetectorRef.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.finishSubscriptions$.next();
    this.finishSubscriptions$.complete();
  }
}
