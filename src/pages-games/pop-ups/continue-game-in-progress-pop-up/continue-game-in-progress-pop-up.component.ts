import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-continue-game-in-progress-pop-up',
  templateUrl: './continue-game-in-progress-pop-up.component.html',
  styleUrls: ['./continue-game-in-progress-pop-up.component.scss'],
})
export class ContinueGameInProgressPopUpComponent {
  @Output()
  public confirmation = new EventEmitter<boolean>();
}
