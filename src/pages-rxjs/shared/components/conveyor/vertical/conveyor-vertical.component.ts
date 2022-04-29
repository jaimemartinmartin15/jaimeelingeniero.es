import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, interval, Observable, Subscription } from 'rxjs';
import { ElemementInConveyor } from '../../../element-in-conveyor';
import { ObservableEventType } from '../../../observable-event-type';
import { DemoContainerComponent } from '../../demo-container/demo-container.component';

@Component({
  selector: 'app-conveyor-vertical',
  templateUrl: './conveyor-vertical.component.svg',
  styleUrls: ['./conveyor-vertical.component.scss'],
})
export class ConveyorVerticalComponent implements OnInit {
  public viewBox: string;
  public elementsInConveyor: ElemementInConveyor[] = [];

  private conveyorWorkingSubscription: Subscription;
  public offsetLineInConveyor = 0;
  private readonly charOffset = 25;
  public linesInConveyor: number[];

  @Input()
  public length = 200;

  @Input()
  public conveyorWorking$: BehaviorSubject<boolean>;

  @Input()
  public addToConveyor$: Observable<Pick<ElemementInConveyor, 'type' | 'value'>>;

  @Output()
  public elementDelivered = new EventEmitter<ElemementInConveyor>();

  public constructor(private readonly demo: DemoContainerComponent) {
    if (demo == null) {
      throw new Error('Cannot create ConveyorVerticalComponent outside a <app-demo-container> component');
    }
  }

  ngOnInit(): void {
    this.viewBox = `0 0 65 ${this.length}`;
    this.linesInConveyor = [...Array(Math.trunc(this.length / 9.5)).keys()];

    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((working) => {
      if (working) {
        this.startConveyor();
      } else if (this.conveyorWorkingSubscription != null) {
        this.stopConveyor();
      }
    });

    this.addToConveyor$.pipe(filter(() => this.conveyorWorking$.getValue())).subscribe((elementToAdd) => {
      const newElement = elementToAdd as ElemementInConveyor;

      newElement.startAt = 0;
      newElement.removeAt = 100;
      newElement.offset = -this.charOffset;

      this.elementsInConveyor.push(newElement);
    });
  }

  private startConveyor() {
    this.conveyorWorkingSubscription = interval(1000 / 60).subscribe(() => {
      this.offsetLineInConveyor < -9 ? (this.offsetLineInConveyor = 0) : (this.offsetLineInConveyor -= this.demo.speed);

      // moves the elements
      for (let i = 0; i < this.elementsInConveyor.length; i++) {
        const elementInConveyor = this.elementsInConveyor[i];
        elementInConveyor.offset += this.demo.speed;

        // checks if has to be removed from the list
        const removeAtPosition = this.length * (elementInConveyor.removeAt! / 100);
        if (elementInConveyor.offset > removeAtPosition) {
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
