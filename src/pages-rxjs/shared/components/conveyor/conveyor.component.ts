import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, interval, Observable, Subscription } from 'rxjs';
import { ElemementInConveyor } from '../../element-in-conveyor';
import { ObservableEventType } from '../../observable-event-type';

@Component({
  selector: 'app-conveyor',
  templateUrl: './conveyor.component.svg',
  styleUrls: ['./conveyor.component.scss'],
})
export class ConveyorComponent implements OnInit {
  public viewBox: string;
  public strokeDashoffset = 0;
  public elementsInConveyor: ElemementInConveyor[] = [];

  private conveyorWorkingSubscription: Subscription;
  private readonly charOffset = 5;

  @Input()
  public conveyorRotation: 'left' | 'right' = 'right';

  @Input()
  public length = 200;

  @Input()
  public conveyorWorking$: BehaviorSubject<boolean>;

  @Input()
  public addToConveyor$: Observable<Pick<ElemementInConveyor, 'type' | 'value'>>;

  @Output()
  public elementDelivered = new EventEmitter<ElemementInConveyor>();

  ngOnInit(): void {
    this.viewBox = `0 0 ${this.length} 85`;

    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((working) => {
      if (working) {
        this.startConveyor();
      } else if (this.conveyorWorkingSubscription != null) {
        this.stopConveyor();
      }
    });

    this.addToConveyor$.pipe(filter(() => this.conveyorWorking$.getValue())).subscribe((elementToAdd) => {
      const newElement = elementToAdd as ElemementInConveyor;

      newElement.startAt = newElement.startAt ?? (this.conveyorRotation === 'right' ? 0 : 100);

      newElement.removeAt = newElement.removeAt ?? (this.conveyorRotation === 'right' ? 100 : 0);

      const valueOffset = newElement.value.length * this.charOffset;
      newElement.offset = this.length * (newElement.startAt / 100) + (this.conveyorRotation === 'right' ? -valueOffset : valueOffset);

      this.elementsInConveyor.push(newElement);
    });
  }

  private startConveyor() {
    this.conveyorWorkingSubscription = interval(40).subscribe(() => {
      this.conveyorRotation === 'right' ? this.strokeDashoffset-- : this.strokeDashoffset++;

      // moves the elements to the correct side
      for (let i = 0; i < this.elementsInConveyor.length; i++) {
        const elementInConveyor = this.elementsInConveyor[i];
        this.conveyorRotation === 'right' ? elementInConveyor.offset!++ : elementInConveyor.offset!--;

        // checks if has to be removed from the list
        const valueOffset = elementInConveyor.value.length * this.charOffset;
        const removeAtPosition =
          this.conveyorRotation === 'right'
            ? this.length * (elementInConveyor.removeAt! / 100) + valueOffset
            : this.length * (elementInConveyor.removeAt! / 100) - valueOffset;
        if (this.conveyorRotation === 'right' ? elementInConveyor.offset > removeAtPosition : elementInConveyor.offset < removeAtPosition) {
          const [deliveredElement] = this.elementsInConveyor.splice(i, 1);

          if (deliveredElement.type === ObservableEventType.ERROR || deliveredElement.type === ObservableEventType.COMPLETE) {
            this.stopConveyor();
          }

          this.elementDelivered.emit(deliveredElement);
        }
      }
    });
  }

  private stopConveyor() {
    this.conveyorWorkingSubscription.unsubscribe();

    this.elementsInConveyor.length = 0;
  }
}
