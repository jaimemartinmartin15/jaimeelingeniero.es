import { Component } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  public constructor(public readonly gameHolderService: GameHolderService) {}
}
