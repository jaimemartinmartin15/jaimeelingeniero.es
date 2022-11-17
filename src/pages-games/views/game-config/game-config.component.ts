import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit {
  // select game name question
  public selectGameNameDropDownOpen = false;
  public selectedGameName = 'pocha';
  public gameNames = ['pocha', 'chinchon', 'uno'];

  public constructor() {}

  public ngOnInit() {}

  public onSelectGameName(gameName: string) {
    this.selectedGameName = gameName;
    this.selectGameNameDropDownOpen = false;
  }

  // public onConfirmStartGame(output: StartGamePopUpOutput) {
  //   // TODO replace or move to confirmation of game-config
  //   this.playersService.createPlayersWithNames(output.names);
  //   this.playersService.playersLoaded$.next();
  //   this.playersService.startsDealing = output.startsDealing;
  // }
}
