import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bullets',
  templateUrl: './bullets.component.html',
  styleUrls: ['./bullets.component.scss'],
})
export class BulletsComponent implements OnInit {
  @Input()
  public maxScore: number = 5;

  @Input()
  public score: number = 5;

  public fullBullets: number[];
  public halfBullets: number[];
  public emptyBullets: number[];

  public ngOnInit(): void {
    this.fullBullets = new Array(Math.trunc(this.score)).fill(1);
    this.halfBullets = this.score - this.fullBullets.length === 0 ? [] : [1];
    this.emptyBullets = new Array(this.maxScore - this.fullBullets.length - this.halfBullets.length).fill(1);
  }
}
