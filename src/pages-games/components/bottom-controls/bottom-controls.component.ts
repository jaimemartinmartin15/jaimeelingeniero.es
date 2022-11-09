import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS } from '../../paths';
import { PopUpsService } from '../../services/pop-ups.service';

@Component({
  selector: 'app-bottom-controls',
  templateUrl: './bottom-controls.component.html',
  styleUrls: ['./bottom-controls.component.scss'],
})
export class BottomControlsComponent {
  private views = [...Object.values(PATHS)];
  private currentViewIndex = 0;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    public readonly popUpsService: PopUpsService
  ) {}

  public changeView() {
    this.currentViewIndex++;
    if (this.currentViewIndex >= this.views.length) {
      this.currentViewIndex = 0;
    }

    this.router.navigate(['./', this.views[this.currentViewIndex]], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
  }
}
