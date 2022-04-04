import { Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged, interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-conveyor',
  templateUrl: './conveyor.component.svg',
  styleUrls: ['./conveyor.component.scss'],
})
export class ConveyorComponent implements OnInit {
  @Input()
  public conveyorWorking$: Observable<boolean>;

  @Input()
  public conveyorRotation: 'left' | 'right' = 'right';

  @Input()
  public addToConveyor$: Observable<any>;

  public strokeDashoffset = 0;
  private strokeDashoffsetSubscription: Subscription;

  public elementsInConveyor: any[] = [];

  ngOnInit(): void {
    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((value) => {
      if (value) {
        this.strokeDashoffsetSubscription = interval(100).subscribe(() => {
          this.conveyorRotation === 'right' ? this.strokeDashoffset-- : this.strokeDashoffset++;

          // moves the elements to the correct side
          for (let i = 0; i < this.elementsInConveyor.length; i++) {
            this.conveyorRotation === 'right' ? this.elementsInConveyor[i].x++ : this.elementsInConveyor[i].x--;
            // delete it if it is outside the viewBox
            if (this.elementsInConveyor[i].x > 210 || this.elementsInConveyor[i].x < -10) {
              this.elementsInConveyor.splice(i, 1);
            }
          }
        });
      } else if (this.strokeDashoffsetSubscription != null) {
        this.strokeDashoffsetSubscription.unsubscribe();
      }
    });

    this.addToConveyor$.subscribe((newElement) => {
      this.elementsInConveyor.push({ text: newElement, x: this.conveyorRotation === 'right' ? -10 : 210 });
    });
  }
}
