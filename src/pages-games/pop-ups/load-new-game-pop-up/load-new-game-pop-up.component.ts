import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-new-game-pop-up',
  templateUrl: './load-new-game-pop-up.component.html',
  styleUrls: ['./load-new-game-pop-up.component.scss'],
})
export class LoadNewGamePopUpComponent {
  @Output()
  public confirmation = new EventEmitter<boolean>();
}
