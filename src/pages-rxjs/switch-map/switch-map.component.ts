import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { observableAnimation } from '../shared/rxjs-animations';
import { ElemementInConveyor, PickElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

interface SwitchMapConveyor {
  conveyorWorking$: BehaviorSubject<boolean>;
  addToConveyor$: Subject<PickElementInConveyor>;
  value: string;
}

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
  animations: [observableAnimation],
})
export class SwitchMapComponent {
  public readonly ObservableEventType = ObservableEventType;

  public switchMapObservables: SwitchMapConveyor[] = [];

  public mainConveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToMainConveyor$ = new Subject<Pick<ElemementInConveyor, 'type' | 'value' | 'removeAt'>>();
  public speechBubble$ = new Subject<SpeechBubble>();

  public onSubscribe(isSubscribed: boolean) {
    this.mainConveyorWorking$.next(isSubscribed);
    if (!isSubscribed) {
      this.switchMapObservables.length = 0;
    }
  }

  public onMainControllerButtonClick(button: PickElementInConveyor) {
    this.addToMainConveyor$.next({
      ...button,
      removeAt: button.type === ObservableEventType.NEXT ? 50 : 100,
    });
  }

  public onMainElementDelivered(element: ElemementInConveyor) {
    if (element.type === ObservableEventType.NEXT) {
      if (element.startAt != 0) {
        this.speechBubble$.next({
          message: element.value,
          type: element.type,
        });
      } else {
        this.switchMapObservables.push({
          conveyorWorking$: new BehaviorSubject<boolean>(true),
          addToConveyor$: new Subject(),
          value: '🍎'.repeat(['1️⃣', '2️⃣', '3️⃣'].indexOf(element.value) + 1),
        });
        if (this.switchMapObservables.length === 2) {
          this.switchMapObservables.splice(0, 1);
        }
      }
    } else {
      this.speechBubble$.next({
        message: element.value,
        type: element.type,
      });
      this.mainConveyorWorking$.next(false);
      this.switchMapObservables.length = 0;
    }
  }

  public onSwitchMapControllerButtonClick(element: PickElementInConveyor) {
    this.switchMapObservables[0].addToConveyor$.next(element);
  }

  public onSwitchMapElementDelivered(element: ElemementInConveyor) {
    element.startAt = 50;
    if (element.type === ObservableEventType.NEXT) {
      this.addToMainConveyor$.next(element);
    } else if (element.type === ObservableEventType.COMPLETE) {
      this.switchMapObservables.splice(0, 1);
    } else {
      this.addToMainConveyor$.next(element);
      this.switchMapObservables.splice(0, 1);
    }
  }
}
