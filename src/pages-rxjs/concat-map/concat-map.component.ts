import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { observableAnimation } from '../shared/rxjs-animations';
import { ElemementInConveyor, PickElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

interface ConcatMapConveyor {
  conveyorWorking$: BehaviorSubject<boolean>;
  addToConveyor$: Subject<PickElementInConveyor>;
  value: string;
}

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss'],
  animations: [observableAnimation],
})
export class ConcatMapComponent {
  public readonly ObservableEventType = ObservableEventType;

  public concatMapObservables: ConcatMapConveyor[] = [];

  public mainConveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToMainConveyor$ = new Subject<Pick<ElemementInConveyor, 'type' | 'value' | 'removeAt'>>();
  public speechBubble$ = new Subject<SpeechBubble>();

  public onSubscribe(isSubscribed: boolean) {
    this.mainConveyorWorking$.next(isSubscribed);
    if (!isSubscribed) {
      this.concatMapObservables.length = 0;
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
        this.concatMapObservables.push({
          conveyorWorking$: new BehaviorSubject<boolean>(this.concatMapObservables.length === 0),
          addToConveyor$: new Subject(),
          value: '🍎'.repeat(['1️⃣', '2️⃣', '3️⃣'].indexOf(element.value) + 1),
        });
      }
    } else {
      this.speechBubble$.next({
        message: element.value,
        type: element.type,
      });
      this.concatMapObservables.length = 0;
      this.mainConveyorWorking$.next(false);
      this.concatMapObservables.length = 0;
    }
  }

  public onConcatMapControllerButtonClick(element: PickElementInConveyor, index: number) {
    this.concatMapObservables[index].addToConveyor$.next(element);
  }

  public onConcatMapElementDelivered(element: ElemementInConveyor, index: number) {
    element.startAt = 50;
    if (element.type === ObservableEventType.NEXT) {
      this.addToMainConveyor$.next(element);
    } else if (element.type === ObservableEventType.COMPLETE) {
      this.concatMapObservables.splice(index, 1);
      this.concatMapObservables[0].conveyorWorking$.next(true);
    } else {
      this.addToMainConveyor$.next(element);
      this.concatMapObservables.splice(index, 1);
    }
  }
}
