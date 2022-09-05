import { Component, HostBinding, Input } from '@angular/core';
import { RankingPlayer } from './player-display/ranking-player';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  @Input()
  public players: RankingPlayer[];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players != null && this.players[0].scores.length === 0;
  }
}
