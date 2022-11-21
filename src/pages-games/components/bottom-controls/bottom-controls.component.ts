import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { PATHS } from '../../paths';
import { BottomControlsService } from './bottom-controls.service';

@Component({
  selector: 'app-bottom-controls',
  templateUrl: './bottom-controls.component.html',
  styleUrls: ['./bottom-controls.component.scss'],
})
export class BottomControlsComponent implements OnInit {
  public showViewNavigation: boolean = false;
  public state: 'game-config' | 'game-started';
  public startButtonEnabled: boolean = false;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    public readonly bottomControlsService: BottomControlsService
  ) {}

  public ngOnInit(): void {
    this.state = this.router.url.includes(`${PATHS.GAME_CONFIG}`) ? 'game-config' : 'game-started';
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe((url: string) => {
        this.state = url.includes(`${PATHS.GAME_CONFIG}`) ? 'game-config' : 'game-started';
      });

    this.bottomControlsService.enableStartGameButton$.subscribe((enabled) => (this.startButtonEnabled = enabled));
  }

  public goToGameConfigView() {
    this.router.navigate(['./', PATHS.GAME_CONFIG], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
  }
}
