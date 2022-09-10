import { Component, HostBinding, Input } from '@angular/core';
import { Player } from '../player/player';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  @Input()
  public players: Player[];

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.players != null && this.players[0].scores.length === 0;
  }
}
