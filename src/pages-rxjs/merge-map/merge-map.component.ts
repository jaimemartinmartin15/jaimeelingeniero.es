import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { observableAnimation } from '../shared/animations';
import { ElemementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss'],
  animations: [observableAnimation],
})
export class MergeMapComponent {
  public applesToEmit: string = Math.random() > 0.5 ? '2️⃣' : '1️⃣';
  public mergeMapObservables: any[] = [];

  public mainConveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToMainConveyor$ = new Subject<Pick<ElemementInConveyor, 'type' | 'value' | 'removeAt'>>();
  public speechBubble$ = new Subject<SpeechBubble>();

  public onSubscribe(isSubscribed: boolean) {
    this.mainConveyorWorking$.next(isSubscribed);
    if (!isSubscribed) {
      this.mergeMapObservables.length = 0;
    }
  }

  public onClickMainNext() {
    this.addToMainConveyor$.next({
      type: ObservableEventType.NEXT,
      value: this.applesToEmit,
      removeAt: 50,
    });
    this.applesToEmit = this.applesToEmit === '1️⃣' ? '2️⃣' : '1️⃣';
  }

  public onClickMainError() {
    this.addToMainConveyor$.next({
      type: ObservableEventType.ERROR,
      value: '🍌',
    });
  }

  public onClickMainComplete() {
    this.addToMainConveyor$.next({
      type: ObservableEventType.COMPLETE,
      value: '🖐️',
    });
  }

  public onMainElementDelivered(element: ElemementInConveyor) {
    if (element.startAt != 0) {
      this.speechBubble$.next({
        message: element.value,
        type: element.type,
      });
      this.mainConveyorWorking$.next(element.type === ObservableEventType.NEXT);
    } else if (element.type === ObservableEventType.NEXT) {
      this.mergeMapObservables.push({
        conveyorWorking$: new BehaviorSubject(true),
        addToConveyor$: new Subject(),
        value: element.value,
      });
    } else {
      this.speechBubble$.next({
        message: element.value,
        type: element.type,
      });
      this.mergeMapObservables.length = 0;
      this.mainConveyorWorking$.next(false);
    }

    if (!this.mainConveyorWorking$.getValue()) {
      this.mergeMapObservables.length = 0;
    }
  }

  public onClickMergeMapNext(i: number) {
    this.mergeMapObservables[i].addToConveyor$.next({
      value: '🍎'.repeat(this.mergeMapObservables[i].value == '2️⃣' ? 2 : 1),
      type: ObservableEventType.NEXT,
    });
  }

  public onClickMergeMapError(index: number) {
    this.mergeMapObservables[index].addToConveyor$.next({
      value: '🍌',
      type: ObservableEventType.ERROR,
    });
  }

  public onClickMergeMapComplete(index: number) {
    this.mergeMapObservables[index].addToConveyor$.next({
      value: '🖐️',
      type: ObservableEventType.COMPLETE,
    });
  }

  public onMergeMapElementDelivered(index: number, element: ElemementInConveyor) {
    element.startAt = 50;
    if (element.type === ObservableEventType.NEXT) {
      this.addToMainConveyor$.next(element);
    } else if (element.type === ObservableEventType.COMPLETE) {
      this.mergeMapObservables.splice(index, 1);
    } else {
      this.mergeMapObservables.splice(index, 1);
      this.addToMainConveyor$.next(element);
    }
  }
}
