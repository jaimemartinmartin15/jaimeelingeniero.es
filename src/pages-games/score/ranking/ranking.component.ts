import { Component, Input } from '@angular/core';
import { RankingPlayer } from './player-display/ranking-player';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  @Input()
  public players: RankingPlayer[];
}
