import { Component, HostBinding, Input } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss'],
})
export class PlayerDisplayComponent {
  @Input()
  public playerId: number;

  @HostBinding('class')
  public get styleClassPosition() {
    return `position-${this.playerPosition}`;
  }

  public constructor(public readonly gameHolderService: GameHolderService) {}

  public get playerPosition() {
    return this.gameHolderService.service.getPlayerPosition(this.playerId);
  }
}
