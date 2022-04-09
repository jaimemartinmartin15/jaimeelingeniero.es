import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ElemementInConveyor, SpeechBubble } from '../shared/constants';

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
      type: 'next',
      value: '🍎',
    });
  }

  public onClickError() {
    this.addToConveyor$.next({
      type: 'error',
      value: '🍌',
    });
  }

  public onClickComplete() {
    this.addToConveyor$.next({
      type: 'complete',
      value: '🖐️',
    });
  }

  public onEventDelivered(element: ElemementInConveyor) {
    if (element.type === 'error' || element.type === 'complete') {
      this.speechBubble$.next({
        message: element.value,
        color: element.type === 'error' ? '#d00' : '#ffdd00',
      });
      this.conveyorWorking$.next(false);
    } else {
      this.conveyorWorking$.next(true);
      this.speechBubble$.next({
        message: element.value,
        color: '#0a0',
      });
    }
  }
}
