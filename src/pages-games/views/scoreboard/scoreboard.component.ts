import { Component, OnInit } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { intervalArray } from 'src/utils/arrays';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  public constructor(public readonly gameHolderService: GameHolderService) {}

  ngOnInit() {}

  public changeScoresForRound(round: number) {
    // TODO: navigate to another screen passing correct input in navigation extras
  }

  public changeScoreForPlayerAndRound(player: number, round: number) {
    // TODO: navigate to another screen passing correct input in navigation extras
  }

  public getRoundNumbersAsArray() {
    return intervalArray(this.gameHolderService.service.getNextRoundNumber() - 1).map((r) => r - 1);
  }

  public getRoundScores(round: number) {
    // TODO
    return this.gameHolderService.service.players.map(() => Math.round(Math.random() * 100));
  }

  public showSpecialRowAfterRound(round: number): boolean {
    // TODO
    return Math.random() > 0.5;
  }

  public getSpecialRoundScores(round: number) {
    // TODO
    return this.gameHolderService.service.players.map(() => Math.round(Math.random() * 100));
  }
}
