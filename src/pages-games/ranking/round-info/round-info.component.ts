import { Component } from '@angular/core';
import { GameConfigService } from '../../services/game/game-config.service';
import { pochaConfig } from '../../services/game/game-configs/pocha-config';
import { PlayersService } from '../../services/player/players.service';

@Component({
  selector: 'app-round-info',
  templateUrl: './round-info.component.html',
  styleUrls: ['./round-info.component.scss'],
})
export class RoundInfoComponent {
  public pochaConfig = pochaConfig;
  public constructor(public readonly gameConfigService: GameConfigService, public readonly playersService: PlayersService) {}
}
