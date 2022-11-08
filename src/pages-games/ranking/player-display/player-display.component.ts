import { Component, HostBinding, Input } from '@angular/core';
import { GameConfigService } from '../../score/game/game-config.service';
import { pochaConfig } from '../../score/game/game-configs/pocha-config';
import { Player } from '../../score/player/player';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss'],
})
export class PlayerDisplayComponent {
  public pochaConfig = pochaConfig;

  @Input()
  public player: Player;

  public constructor(public readonly gameConfigService: GameConfigService) {}

  @HostBinding('class.position-1')
  public get firstPosition() {
    return this.player.position === 1;
  }

  @HostBinding('class.position-2')
  public get secondPosition() {
    return this.player.position === 2;
  }

  @HostBinding('class.position-3')
  public get thirdPosition() {
    return this.player.position === 3;
  }
}
