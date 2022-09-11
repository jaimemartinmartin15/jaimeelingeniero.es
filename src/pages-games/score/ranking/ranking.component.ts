import { Component, HostBinding } from '@angular/core';
import { PlayersService } from '../player/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  public constructor(public readonly playersService: PlayersService) {}

  @HostBinding('class.empty-state')
  public get isEmptyState(): boolean {
    return this.playersService.players == null || this.playersService.nextRoundNumber === 1;
  }
}
