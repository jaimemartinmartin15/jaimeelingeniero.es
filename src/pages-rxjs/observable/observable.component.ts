import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent {
  public conveyorWorking$ = new BehaviorSubject<boolean>(false);
  public addToConveyor$ = new Subject<any>();

  public subscribe() {
    this.conveyorWorking$.next(true);
  }

  public onClickNext() {
    this.addToConveyor$.next('🍎');
  }

  public onClickError() {
    this.addToConveyor$.next('🍌');
  }

  public onClickComplete() {
    this.conveyorWorking$.next(false);
  }
}
