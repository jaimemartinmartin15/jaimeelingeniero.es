import { Component } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';

@Component({
  selector: 'app-players-performance-graph',
  templateUrl: './players-performance-graph.component.html',
  styleUrls: ['./players-performance-graph.component.scss'],
})
export class PlayersPerformanceGraphComponent {
  public constructor(public readonly gameHolderService: GameHolderService) {}
}
