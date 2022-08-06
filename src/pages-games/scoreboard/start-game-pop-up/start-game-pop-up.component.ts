import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-game-pop-up',
  templateUrl: './start-game-pop-up.component.html',
  styleUrls: ['./start-game-pop-up.component.scss'],
})
export class StartGamePopUpComponent {
  @Output()
  public confirm = new EventEmitter<{
    numberOfPlayers: number;
    numberOfRounds: number;
  }>();

  public numberOfPlayers = 4;
  public numberOfRounds = 23;

  public onConfirm() {
    this.confirm.emit({
      numberOfPlayers: this.numberOfPlayers,
      numberOfRounds: this.numberOfRounds,
    });
  }
}
