import { Inject, Injectable } from '@angular/core';
import { GAME_SERVICES } from '../pages-games.module';
import { GameService } from './game.service';

@Injectable()
export class GameHolderService {
  public service: GameService;

  public constructor(@Inject(GAME_SERVICES) gameServices: GameService[]) {
    this.service = gameServices[0];
  }
}
