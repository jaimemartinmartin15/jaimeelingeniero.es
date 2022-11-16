import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit {
  public constructor() {}

  public ngOnInit() {}

  // public onConfirmStartGame(output: StartGamePopUpOutput) {
  //   // TODO replace or move to confirmation of game-config
  //   this.playersService.createPlayersWithNames(output.names);
  //   this.playersService.playersLoaded$.next();
  //   this.playersService.startsDealing = output.startsDealing;
  // }
}
