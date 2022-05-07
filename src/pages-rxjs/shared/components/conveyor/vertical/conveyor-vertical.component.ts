import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, interval, Subscription } from 'rxjs';
import { DemoContainerComponent } from '../../demo-container/demo-container.component';

@Component({
  selector: 'g[appConveyorVertical]',
  templateUrl: './conveyor-vertical.component.svg',
  styleUrls: ['./conveyor-vertical.component.scss'],
})
export class ConveyorVerticalComponent implements OnInit {
  private conveyorWorkingSubscription: Subscription;

  public offsetLineInConveyor = 0;
  public linesInConveyor: number[];

  @Input()
  public conveyorRotation: 'up' | 'down' = 'down';

  @Input()
  public length = 204;

  @Input()
  public conveyorWorking$: BehaviorSubject<boolean>;

  public constructor(private readonly demo: DemoContainerComponent) {
    if (demo == null) {
      throw new Error('Cannot create a vertical conveyor outside a demo container');
    }
  }

  public ngOnInit(): void {
    // line width plus space to next line is 11. we add 2 aditional lines outside to do the animation
    // length should be a multiple of 11 and then sum 6: example 18*11+6=204
    this.linesInConveyor = [...Array(Math.trunc(this.length / 11 + 2)).keys()];

    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((working) => {
      if (working) {
        this.conveyorWorkingSubscription = interval(this.demo.fps).subscribe(() => {
          if (this.conveyorRotation === 'down') {
            if (this.offsetLineInConveyor >= 11) {
              this.offsetLineInConveyor = 0;
            } else {
              this.offsetLineInConveyor += this.demo.speed;
            }
          } else {
            if (this.offsetLineInConveyor <= -11) {
              this.offsetLineInConveyor = 0;
            } else {
              this.offsetLineInConveyor -= this.demo.speed;
            }
          }
        });
      } else if (this.conveyorWorkingSubscription != null) {
        this.conveyorWorkingSubscription.unsubscribe();
      }
    });
  }
}
