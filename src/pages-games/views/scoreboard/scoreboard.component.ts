import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { ROUTING_PATHS } from 'src/pages-games/routing-paths';
import { intervalArray } from 'src/utils/arrays';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  public constructor(
    public readonly gameHolderService: GameHolderService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public changeScoresForRound(round: number) {
    const state = {
      players: this.gameHolderService.service.players.map((p) => ({ ...p, punctuation: p.scores[round] })),
      roundNumber: round + 1,
    };
    this.router.navigate(['../', ROUTING_PATHS.ENTER_SCORE], { relativeTo: this.activatedRoute, state });
  }

  public changeScoreForPlayerAndRound(playerId: number, round: number) {
    const player = this.gameHolderService.service.players[playerId];
    const state = {
      players: [{ ...player, punctuation: player.scores[round] }],
      roundNumber: round + 1,
    };
    this.router.navigate(['../', ROUTING_PATHS.ENTER_SCORE], { relativeTo: this.activatedRoute, state });
  }

  public getRoundNumbersAsArray() {
    return intervalArray(this.gameHolderService.service.getNextRoundNumber() - 1).map((r) => r - 1);
  }

  public getRoundScores(round: number) {
    return this.gameHolderService.service.players.map((p) => p.scores[round]);
  }
}
