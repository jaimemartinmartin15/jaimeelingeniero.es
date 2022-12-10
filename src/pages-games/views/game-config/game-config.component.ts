import { Component, Inject, OnInit } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { GameService } from 'src/pages-games/game-services/game.service';
import { GAME_SERVICES } from 'src/pages-games/pages-games.module';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit {
  public selectGameNameDropDownOpen = false;

  public constructor(@Inject(GAME_SERVICES) public gameServices: GameService[], public readonly gameHolderService: GameHolderService) {}

  ngOnInit() {}

  public onSelectGameName(gameService: GameService) {
    this.selectGameNameDropDownOpen = false;
    this.gameHolderService.service = gameService;
  }
}
