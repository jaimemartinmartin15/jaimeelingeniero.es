import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ElemementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent {
  public conveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToConveyor$ = new Subject<Pick<ElemementInConveyor, 'type' | 'value'>>();
  public speechBubble$ = new Subject<SpeechBubble>();

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
  }

  public onClickNext() {
    this.addToConveyor$.next({
      type: ObservableEventType.NEXT,
      value: '🍎',
    });
  }

  public onClickError() {
    this.addToConveyor$.next({
      type: ObservableEventType.ERROR,
      value: '🍌',
    });
  }

  public onClickComplete() {
    this.addToConveyor$.next({
      type: ObservableEventType.COMPLETE,
      value: '🖐️',
    });
  }

  public onEventDelivered(element: ElemementInConveyor) {
    this.speechBubble$.next({
      message: element.value,
      type: element.type,
    });
    this.conveyorWorking$.next(element.type === ObservableEventType.NEXT);
  }
}
