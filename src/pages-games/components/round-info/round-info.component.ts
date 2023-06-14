import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { ROUTING_PATHS } from 'src/pages-games/routing-paths';

@Component({
  selector: 'app-round-info',
  templateUrl: './round-info.component.html',
  styleUrls: ['./round-info.component.scss'],
})
export class RoundInfoComponent {
  public constructor(
    public readonly gameHolderService: GameHolderService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  @HostListener('click')
  private navigateToChangeConfig() {
    this.router.navigate(['../', ROUTING_PATHS.CHANGE_CONFIG], { relativeTo: this.activatedRoute });
  }
}
