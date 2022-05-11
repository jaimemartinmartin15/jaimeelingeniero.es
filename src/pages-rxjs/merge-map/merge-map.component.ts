import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { observableAnimation } from '../shared/rxjs-animations';
import { ElemementInConveyor2, PickElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';
import { ButtonController } from '../shared/components/conveyor-controller/button-controller';

interface MergeMapConveyor {
  conveyorWorking$: BehaviorSubject<boolean>;
  addToConveyor$: Subject<PickElementInConveyor>;
  value: string;
}

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss'],
  animations: [observableAnimation],
})
export class MergeMapComponent {
  public readonly MAIN = '0';

  public readonly speechBubble$ = new Subject<SpeechBubble>();

  public controllerButtons: { [key: string]: ButtonController[] } = {
    [this.MAIN]: [
      { value: '🏠', type: ObservableEventType.ERROR, controllerId: this.MAIN, enabled: false },
      { value: '🖐️', type: ObservableEventType.COMPLETE, controllerId: this.MAIN, enabled: false },
      { value: '🍎', type: ObservableEventType.NEXT, controllerId: this.MAIN, enabled: false },
      { value: '🍌', type: ObservableEventType.NEXT, controllerId: this.MAIN, enabled: false },
      { value: '🥝', type: ObservableEventType.NEXT, controllerId: this.MAIN, enabled: false },
    ],
  };

  public conveyorsWorking: { [key: string]: BehaviorSubject<boolean> } = {
    [this.MAIN]: new BehaviorSubject<boolean>(false),
  };

  public onSubscribe(isSubscribed: boolean): void {
    Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = isSubscribed)));
    Object.values(this.conveyorsWorking).forEach((conveyor) => conveyor.next(isSubscribed));
  }

  public onControllerButtonClick(button: ButtonController) {
    if (button.type === ObservableEventType.ERROR || button.type === ObservableEventType.COMPLETE) {
      Object.values(this.controllerButtons).forEach((controller) => controller.forEach((button) => (button.enabled = false)));
    }
  }
}
