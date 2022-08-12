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

  public addPlayer() {
    this.players.push('');
  }

  public deletePlayer(index: number, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.players.splice(index, 1);
  }

  public trackByPlayerIndex(index: number) {
    return index;
  }

  public playersAreEntered(): boolean {
    return this.players.every((p) => p != '');
  }

  public onConfirm() {
    this.confirm.emit(this.players);
  }
}
