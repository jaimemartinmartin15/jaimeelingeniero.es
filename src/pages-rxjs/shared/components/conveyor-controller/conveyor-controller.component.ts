import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-conveyor-controller',
  templateUrl: './conveyor-controller.component.svg',
  styleUrls: ['./conveyor-controller.component.scss'],
})
export class ConveyorControllerComponent {
  @Output()
  public onClickNext = new EventEmitter<void>();

  @Output()
  public onClickError = new EventEmitter<void>();

  @Output()
  public onClickComplete = new EventEmitter<void>();
}
