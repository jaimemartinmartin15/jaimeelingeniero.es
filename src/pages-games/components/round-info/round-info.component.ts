import { Component } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';

@Component({
  selector: 'app-round-info',
  templateUrl: './round-info.component.html',
  styleUrls: ['./round-info.component.scss'],
})
export class RoundInfoComponent {
  public constructor(public readonly gameHolderService: GameHolderService) {}
}
