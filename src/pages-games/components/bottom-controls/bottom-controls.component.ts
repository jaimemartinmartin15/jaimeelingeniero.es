import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { ROUTING_PATHS } from 'src/pages-games/routing-paths';

@Component({
  selector: 'app-bottom-controls',
  templateUrl: './bottom-controls.component.html',
  styleUrls: ['./bottom-controls.component.scss'],
})
export class BottomControlsComponent {
  public readonly ROUTING_PATHS = ROUTING_PATHS;
  public showViewNavigation: boolean = false;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly gameHolderService: GameHolderService
  ) {}

  public goToGameConfigView() {
    this.router.navigate(['../', ROUTING_PATHS.GAME_CONFIG], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
  }

  public enterNewRound() {
    const state = {
      players: this.gameHolderService.service.players.map((p) => ({ ...p, punctuation: 0 })),
      roundNumber: this.gameHolderService.service.getNextRoundNumber(),
    };
    this.router.navigate(['../', ROUTING_PATHS.ENTER_SCORE], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge', state });
  }
}
