import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { Player } from '../player/player';
import { PlayersService } from '../player/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingComponent implements OnInit {
  public players: Player[];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players == null || this.playersService.playedRounds === 0;
  }

  public constructor(public readonly playersService: PlayersService) {}

  public ngOnInit(): void {
    this.playersService.playersLoaded$.subscribe(() => {
      this.players = this.playersService.playersByPosition;
      // todo check change detector
    });

    this.playersService.scoreChanged$.subscribe(() => {
      this.players = this.playersService.playersByPosition;
      // todo check change detector
    });
  }
}
