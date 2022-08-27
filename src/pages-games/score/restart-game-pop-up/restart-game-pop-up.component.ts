import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-restart-game-pop-up',
  templateUrl: './restart-game-pop-up.component.html',
  styleUrls: ['./restart-game-pop-up.component.scss'],
})
export class RestartGamePopUpComponent {
  @Output()
  public confirmation = new EventEmitter<boolean>();
}
