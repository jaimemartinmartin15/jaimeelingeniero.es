import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EventColor, SpeechBubble } from '../../constants';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.svg',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent implements OnInit {
  public speechBubbleColor: EventColor = 'none';
  public speechBubbleText: string;
  public isSubscribed: boolean = false;

  @Input()
  public speechBubble$: Observable<SpeechBubble>;

  @Output()
  public onSubscribe$ = new EventEmitter<boolean>();

  public ngOnInit(): void {
    this.speechBubble$.subscribe((event) => {
      // it will produce a flash in case two same elements are emited
      this.speechBubbleColor = 'none';
      this.speechBubbleText = '';
      setTimeout(() => {
        this.isSubscribed = event.color === '#0a0';
        this.speechBubbleColor = event.color;
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
