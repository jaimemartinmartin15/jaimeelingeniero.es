import { Component } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { BaseOperatorComponent } from '../shared/base-operator.component';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';
import { ElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss'],
})
export class TakeComponent extends BaseOperatorComponent {
  public counterTake = 3;
  public counterTakeEmojis = ['1️⃣', '2️⃣', '3️⃣'];
  protected operator = take(this.counterTake);

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN_ID]: [
      { value: '🧲', type: ObservableEventType.ERROR, controllerId: this.MAIN_ID, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍓', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🍋', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
      { value: '🥦', type: ObservableEventType.NEXT, controllerId: this.MAIN_ID, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN_ID]: new BehaviorSubject<boolean>(false),
  };

  protected moveElement(e: ElementInConveyor): void {
    e.x += this.demo.speed;
  }

  protected isElementDeliveredToOperator(e: ElementInConveyor): boolean {
    return e.x >= 300 && e.x <= 320;
  }

  protected isElementDeliveredToSubscriber(e: ElementInConveyor): boolean {
    return e.x >= 450;
  }

  protected addElementToBeginningOfConveyor(conveyorId: string, type: ObservableEventType, value: string) {
    this.elementsInConveyor.push({ conveyorId, type, value, x: 220 } as ElementInConveyor);
  }

  public override onSubscribeHook() {
    this.counterTake = 3;
  }

  protected onOperatorDeliverNextEvent(value: string): void {
    this.counterTake--;
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.NEXT,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverErrorEvent(value: string): void {
    this.elementsInConveyor.push({
      conveyorId: this.MAIN_ID,
      type: ObservableEventType.ERROR,
      value,
      x: 350,
    } as ElementInConveyor);
  }

  protected onOperatorDeliverCompleteEvent(): void {
    setTimeout(() => {
      this.elementsInConveyor.push({
        conveyorId: this.MAIN_ID,
        type: ObservableEventType.COMPLETE,
        value: this.controllerButtons[this.MAIN_ID][1].value,
        x: 350,
      } as ElementInConveyor);
    }, 1000 / this.demo.speed);
  }
}
