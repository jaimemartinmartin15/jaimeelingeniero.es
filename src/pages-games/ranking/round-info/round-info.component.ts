import { Component } from '@angular/core';
import { GameConfigService } from '../../score/game/game-config.service';
import { pochaConfig } from '../../score/game/game-configs/pocha-config';
import { PlayersService } from '../../score/player/players.service';

@Component({
  selector: 'app-round-info',
  templateUrl: './round-info.component.html',
  styleUrls: ['./round-info.component.scss'],
})
export class RoundInfoComponent {
  public pochaConfig = pochaConfig;
  public constructor(public readonly gameConfigService: GameConfigService, public readonly playersService: PlayersService) {}
}
