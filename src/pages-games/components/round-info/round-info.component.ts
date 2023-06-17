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
    // the condition is to ensure the player names were saved in local storage after
    // entering first round and they do not appear empty
    if (this.gameHolderService.service.getNextRoundNumber() > 1) {
      this.router.navigate(['../', ROUTING_PATHS.CHANGE_CONFIG], { relativeTo: this.activatedRoute });
    }
  }
}
