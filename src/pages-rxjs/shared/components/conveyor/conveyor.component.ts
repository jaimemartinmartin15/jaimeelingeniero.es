import { Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged, interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-conveyor',
  templateUrl: './conveyor.component.svg',
  styleUrls: ['./conveyor.component.scss']
})
export class ConveyorComponent implements OnInit {
  @Input()
  public conveyorWorking$: Observable<boolean>;

  public strokeDashoffset = 0;
  private strokeDashoffsetSubscription: Subscription;

  ngOnInit(): void {
    this.conveyorWorking$.pipe(distinctUntilChanged()).subscribe((value) => {
      if (value) {
        this.strokeDashoffsetSubscription = interval(100).subscribe(() => this.strokeDashoffset--);
      } else if (this.strokeDashoffsetSubscription != null) {
        this.strokeDashoffsetSubscription.unsubscribe();
      }
    });
  }
}
