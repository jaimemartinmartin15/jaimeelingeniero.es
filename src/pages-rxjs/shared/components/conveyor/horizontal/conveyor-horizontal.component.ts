import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, interval, Subscription } from 'rxjs';
import { DemoContainerComponent } from '../../demo-container/demo-container.component';

@Component({
  selector: 'g[appConveyorHorizontal]',
  templateUrl: './conveyor-horizontal.component.svg',
  styleUrls: ['./conveyor-horizontal.component.scss'],
})
export class ConveyorHorizontalComponent implements OnInit {
  public strokeDashoffset = 0;

  private conveyorWorkingSubscription: Subscription;

  @Input()
  public conveyorRotation: 'left' | 'right' = 'right';

  @Input()
  public length = 200;

  @Input()
  public conveyorWorking$: BehaviorSubject<boolean>;

  public constructor(private readonly demo: DemoContainerComponent) {
    if (demo == null) {
      throw new Error('Cannot create an horizontal conveyor outside a demo container');
    }
  }

  public ngOnInit(): void {
    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((working) => {
      if (working) {
        this.conveyorWorkingSubscription = interval(this.demo.fps).subscribe(() => {
          if (this.conveyorRotation === 'right') {
            this.strokeDashoffset -= this.demo.speed;
          } else {
            this.strokeDashoffset += this.demo.speed;
          }
        });
      } else if (this.conveyorWorkingSubscription != null) {
        this.conveyorWorkingSubscription.unsubscribe();
      }
    });
  }
}
