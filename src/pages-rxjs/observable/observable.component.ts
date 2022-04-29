import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ElemementInConveyor, PickElementInConveyor } from '../shared/element-in-conveyor';
import { ObservableEventType } from '../shared/observable-event-type';
import { SpeechBubble } from '../shared/speech-bubble';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent {
  public readonly ObservableEventType = ObservableEventType;

  public conveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToConveyor$ = new Subject<PickElementInConveyor>();
  public speechBubble$ = new Subject<SpeechBubble>();

  public onSubscribe(isSubscribed: boolean) {
    this.conveyorWorking$.next(isSubscribed);
  }

  public onControllerButtonClick(buttonElement: PickElementInConveyor) {
    this.addToConveyor$.next(buttonElement);
  }

  public onEventDelivered(element: ElemementInConveyor) {
    this.speechBubble$.next({
      message: element.value,
      type: element.type,
    });
    this.conveyorWorking$.next(element.type === ObservableEventType.NEXT);
  }
}
