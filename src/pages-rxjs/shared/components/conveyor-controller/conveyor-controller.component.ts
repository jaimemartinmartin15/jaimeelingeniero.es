import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObservableEventType } from '../../observable-event-type';
import { ButtonController } from './button-controller';

@Component({
  selector: 'g[appConveyorController]',
  templateUrl: './conveyor-controller.component.svg',
  styleUrls: ['./conveyor-controller.component.scss'],
})
export class ConveyorControllerComponent {
  public readonly ObservableEventType = ObservableEventType;

  @Input()
  public controllerId: string;

  @Input()
  public button1: ButtonController;

  @Input()
  public button2: ButtonController;

  @Input()
  public button3: ButtonController;

  @Input()
  public button4: ButtonController;

  @Input()
  public button5: ButtonController;

  @Output()
  public onControllerIdClick = new EventEmitter<string>();

  @Output()
  public onButtonClick = new EventEmitter<ButtonController>();

  public onControllerButtonClick(button: ButtonController) {
    if (button.enabled !== false) {
      // return a copy of the value (different reference)
      this.onButtonClick.emit({
        type: button.type,
        value: button.value,
        controllerId: this.controllerId ?? button.controllerId,
        enabled: button.enabled,
      });
    }
  }

  public getButtonClass(button: ButtonController) {
    return {
      'controller-button--next': button.type === ObservableEventType.NEXT,
      'controller-button--error': button.type === ObservableEventType.ERROR,
      'controller-button--complete': button.type === ObservableEventType.COMPLETE,
      'controller-button--disabled': !button.enabled,
    };
  }
}
