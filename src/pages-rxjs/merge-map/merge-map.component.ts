import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { observableAnimation } from '../shared/rxjs-animations';
import { ElemementInConveyor, PickElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

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
  public readonly ObservableEventType = ObservableEventType;

  public mergeMapObservables: MergeMapConveyor[] = [];

  public mainConveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToMainConveyor$ = new Subject<Pick<ElemementInConveyor, 'type' | 'value' | 'removeAt'>>();
  public speechBubble$ = new Subject<SpeechBubble>();

  public onSubscribe(isSubscribed: boolean) {
    this.mainConveyorWorking$.next(isSubscribed);
    if (!isSubscribed) {
      this.mergeMapObservables.length = 0;
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
        this.mergeMapObservables.push({
          conveyorWorking$: new BehaviorSubject<boolean>(true),
          addToConveyor$: new Subject(),
          value: '🍎'.repeat(['1️⃣', '2️⃣', '3️⃣'].indexOf(element.value) + 1),
        });
      }
    } else {
      this.speechBubble$.next({
        message: element.value,
        type: element.type,
      });
      this.mergeMapObservables.length = 0;
      this.mainConveyorWorking$.next(false);
      this.mergeMapObservables.length = 0;
    }
  }

  public onMergeMapControllerButtonClick(element: PickElementInConveyor, index: number) {
    this.mergeMapObservables[index].addToConveyor$.next(element);
  }

  public onMergeMapElementDelivered(element: ElemementInConveyor, index: number) {
    element.startAt = 50;
    if (element.type === ObservableEventType.NEXT) {
      this.addToMainConveyor$.next(element);
    } else if (element.type === ObservableEventType.COMPLETE) {
      this.mergeMapObservables.splice(index, 1);
    } else {
      this.addToMainConveyor$.next(element);
      this.mergeMapObservables.splice(index, 1);
    }
  }
}
