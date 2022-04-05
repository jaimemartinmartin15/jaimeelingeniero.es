import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.svg',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent {
  @Output()
  public onSubscribe$ = new EventEmitter<void>();
}
