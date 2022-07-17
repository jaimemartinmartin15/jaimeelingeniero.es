import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableEventType } from '../../observable-event-type';
import { SpeechBubble } from '../../speech-bubble';

@Component({
  selector: 'g[appSubscriber]',
  templateUrl: './subscriber.component.svg',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent implements OnInit {
  public speechBubbleColor: string = 'none';
  public speechBubbleText: string;
  public isSubscribed: boolean = false;

  @Input()
  public showSpeechBubble$: Observable<SpeechBubble>;

  @Output()
  public onSubscribe$ = new EventEmitter<boolean>();

  public ngOnInit(): void {
    this.showSpeechBubble$.subscribe((event) => {
      // it will produce a flash in case two same elements are emited
      this.speechBubbleColor = 'none';
      this.speechBubbleText = '';
      setTimeout(() => {
        this.isSubscribed = event.type === ObservableEventType.NEXT;
        this.speechBubbleColor = event.type.color;
        this.speechBubbleText = event.message;
      }, 60);
    });
  }

  public subscribe() {
    this.isSubscribed = true;
    this.speechBubbleColor = 'none';
    this.speechBubbleText = '';
    this.onSubscribe$.emit(true);
  }

  public unsubscribe() {
    this.isSubscribed = false;
    this.speechBubbleColor = 'none';
    this.speechBubbleText = '';
    this.onSubscribe$.emit(false);
  }
}
