import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.svg',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent {
  @Input()
  public onSubscribe$ = new EventEmitter<void>();
}
