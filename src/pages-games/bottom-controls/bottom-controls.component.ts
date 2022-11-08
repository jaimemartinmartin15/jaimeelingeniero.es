import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS } from '../paths';

@Component({
  selector: 'app-bottom-controls',
  templateUrl: './bottom-controls.component.html',
  styleUrls: ['./bottom-controls.component.scss'],
})
export class BottomControlsComponent {
  private views = [...Object.values(PATHS)];
  private currentViewIndex = 0;

  @Output()
  public startNewGame = new EventEmitter<void>();

  @Output()
  public enterNewRound = new EventEmitter<void>();

  public constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {}

  public changeView() {
    this.currentViewIndex++;
    if (this.currentViewIndex >= this.views.length) {
      this.currentViewIndex = 0;
    }

    this.router.navigate(['./', this.views[this.currentViewIndex]], { relativeTo: this.activatedRoute });
  }
}
