import { Component } from '@angular/core';
import { pochaConfig } from '../../../game-configs/pocha-config';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-round-info',
  templateUrl: './round-info.component.html',
  styleUrls: ['./round-info.component.scss'],
})
export class RoundInfoComponent {
  public pochaConfig = pochaConfig;
  public constructor(public readonly gameService: GameService) {}
}
