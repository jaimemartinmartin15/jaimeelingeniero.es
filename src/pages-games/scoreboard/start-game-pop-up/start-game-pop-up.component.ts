import { Component, Output, EventEmitter } from '@angular/core';
import { StartGamePopUpOutput } from './start-game-pop-up.contract';

@Component({
  selector: 'app-start-game-pop-up',
  templateUrl: './start-game-pop-up.component.html',
  styleUrls: ['./start-game-pop-up.component.scss'],
})
export class StartGamePopUpComponent {
  @Output()
  public confirm = new EventEmitter<StartGamePopUpOutput>();

  public players: string[] = ['', '', '', ''];
  public numberOfRounds = 23;

  public onNumberOfPlayersChange(numberOfPlayers: number) {
    if (numberOfPlayers != null) {
      this.players.length = numberOfPlayers;
      this.numberOfRounds = Math.ceil(40 / numberOfPlayers) * 2 + numberOfPlayers - 1;
    }
  }

  public trackByPlayerInputs(index: number) {
    return index;
  }

  public onConfirm() {
    this.confirm.emit({
      players: this.players,
      numberOfRounds: this.numberOfRounds,
    });
  }
}
