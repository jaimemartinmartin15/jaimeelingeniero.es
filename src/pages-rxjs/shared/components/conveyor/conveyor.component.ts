import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, interval, Observable, Subscription } from 'rxjs';
import { ElemementInConveyor } from '../../constants';

@Component({
  selector: 'app-conveyor',
  templateUrl: './conveyor.component.svg',
  styleUrls: ['./conveyor.component.scss'],
})
export class ConveyorComponent implements OnInit {
  @Input()
  public conveyorWorking$: BehaviorSubject<boolean>;

  @Input()
  public conveyorRotation: 'left' | 'right' = 'right';

  @Input()
  public addToConveyor$: Observable<Pick<ElemementInConveyor, 'type' | 'value'>>;

  @Output()
  public elementDelivered = new EventEmitter<ElemementInConveyor>();

  public strokeDashoffset = 0;
  private strokeDashoffsetSubscription: Subscription;

  public elementsInConveyor: ElemementInConveyor[] = [];

  ngOnInit(): void {
    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((value) => {
      if (value) {
        this.startConveyor();
      } else if (this.strokeDashoffsetSubscription != null) {
        this.stopConveyor();
      }
    });

    this.addToConveyor$.pipe(filter(() => this.conveyorWorking$.getValue())).subscribe((newElement) => {
      this.elementsInConveyor.push({ ...newElement, offset: this.conveyorRotation === 'right' ? -10 : 210 });
    });
  }

  private startConveyor() {
    this.strokeDashoffsetSubscription = interval(40).subscribe(() => {
      this.conveyorRotation === 'right' ? this.strokeDashoffset-- : this.strokeDashoffset++;

      // moves the elements to the correct side
      for (let i = 0; i < this.elementsInConveyor.length; i++) {
        this.conveyorRotation === 'right' ? this.elementsInConveyor[i].offset++ : this.elementsInConveyor[i].offset--;
        // delete it if it is outside the viewBox
        if (this.elementsInConveyor[i].offset > 210 || this.elementsInConveyor[i].offset < -10) {
          const [deliveredElement] = this.elementsInConveyor.splice(i, 1);

          if (deliveredElement.type === 'error' || deliveredElement.type === 'complete') {
            this.stopConveyor();
          }

          this.elementDelivered.emit(deliveredElement);
        }
      }
    });
  }

  private stopConveyor() {
    // stops the conveyor
    this.strokeDashoffsetSubscription.unsubscribe();

    this.elementsInConveyor.length = 0;
  }
}
