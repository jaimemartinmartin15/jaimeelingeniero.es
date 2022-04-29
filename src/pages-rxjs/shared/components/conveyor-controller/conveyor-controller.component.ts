import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PickElementInConveyor } from '../../element-in-conveyor';
import { ObservableEventType } from '../../observable-event-type';

@Component({
  selector: 'app-conveyor-controller',
  templateUrl: './conveyor-controller.component.svg',
  styleUrls: ['./conveyor-controller.component.scss'],
})
export class ConveyorControllerComponent {
  public readonly ObservableEventType = ObservableEventType;

  @Input()
  public controllerId: string;

  @Input()
  public button1: PickElementInConveyor;

  @Input()
  public button2: PickElementInConveyor;

  @Input()
  public button3: PickElementInConveyor;

  @Input()
  public button4: PickElementInConveyor;

  @Input()
  public button5: PickElementInConveyor;

  @Output()
  public onControllerIdClick = new EventEmitter<string>();

  @Output()
  public onButtonClick = new EventEmitter<PickElementInConveyor>();

  public onControllerButtonClick(button: PickElementInConveyor) {
    // return a copy of the value so that same reference is not in the conveyor several times
    this.onButtonClick.emit({ ...button });
  }

  public getButtonClass(button: PickElementInConveyor) {
    return {
      'next-button': button.type === ObservableEventType.NEXT,
      'error-button': button.type === ObservableEventType.ERROR,
      'complete-button': button.type === ObservableEventType.COMPLETE,
    };
  }
}
