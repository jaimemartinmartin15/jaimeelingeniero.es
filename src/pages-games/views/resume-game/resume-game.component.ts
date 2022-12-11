import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { GameService } from 'src/pages-games/game-services/game.service';
import { LOCAL_STORE_KEYS } from 'src/pages-games/local-storage-keys';
import { GAME_SERVICES } from 'src/pages-games/pages-games.module';
import { ROUTING_PATHS } from 'src/pages-games/routing-paths';

@Component({
  selector: 'app-resume-game',
  templateUrl: './resume-game.component.html',
  styleUrls: ['./resume-game.component.scss'],
})
export class ResumeGameComponent implements OnInit {
  public gameName: string;
  public showGameName = true;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    @Inject(GAME_SERVICES) private gameServices: GameService[],
    private readonly gameHolderService: GameHolderService
  ) {}

  public ngOnInit() {
    // Note: gameName should not be undefined if this page was loaded
    this.gameName = localStorage.getItem(LOCAL_STORE_KEYS.GAME_NAME)!.toLowerCase();
    this.showGameName = this.gameName != undefined && this.gameName != 'otro';
  }

  public doNotResumeGame() {
    this.router.navigate(['../', ROUTING_PATHS.GAME_CONFIG], { relativeTo: this.activatedRoute });
  }

  public resumeGame() {
    const gameService = this.gameServices.find((gs) => gs.gameName.toLowerCase() === this.gameName) as GameService;
    this.gameHolderService.service = gameService as GameService; // should not be undefined if this page was loaded

    // load players and scores
    gameService.players = JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.PLAYERS)!);
    gameService.playerStartsDealing = JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.STARTS_DEALING)!);

    // override configuration from local storage
    const config = JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.CONFIG)!);
    gameService.numberOfCards = config.numberOfCards;
    gameService.limitScore = config.limitScore;
    gameService.winner = config.winner;

    this.router.navigate(['../', ROUTING_PATHS.RANKING], { relativeTo: this.activatedRoute });
  }
}
