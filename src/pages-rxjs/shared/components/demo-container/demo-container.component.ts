import { Component } from '@angular/core';

interface SpeedTuple {
  speed: number;
  speedDisplay: string;
}

@Component({
  selector: 'svg[appDemoContainer]',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
})
export class DemoContainerComponent {
  public readonly speeds: SpeedTuple[] = [
    { speedDisplay: '1', speed: 0.25 },
    { speedDisplay: '2', speed: 0.6 },
    { speedDisplay: '3', speed: 1 },
    { speedDisplay: '4', speed: 3 },
    { speedDisplay: '5', speed: 5 },
  ];
  public currentSpeed = 2;

  public changeSpeed() {
    this.currentSpeed++;
    if (this.currentSpeed >= this.speeds.length) {
      this.currentSpeed = 0;
    }
  }

  public get speed() {
    return this.speeds[this.currentSpeed].speed;
  }

  public get fps() {
    return 1000 / 60;
  }
}
