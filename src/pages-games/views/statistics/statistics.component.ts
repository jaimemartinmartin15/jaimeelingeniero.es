import { Component } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  private formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

  public constructor(public readonly gameHolderService: GameHolderService) {}

  public getPlayersInFirstPosition(): string {
    const players = this.gameHolderService.service.players;
    const positions = players.map((p) => this.gameHolderService.service.getPlayerPosition(p.id));
    const winners = positions
      .reduce((winners, position, playerId) => [...winners, { position, name: players[playerId].name }], [] as { position: number; name: string }[])
      .filter((v) => v.position === 1)
      .map((v) => v.name);
    return this.formatter.format(winners);
  }

  public getPlayersInLastPosition(): string {
    const players = this.gameHolderService.service.players;
    const positions = players.map((p) => this.gameHolderService.service.getPlayerPosition(p.id));
    const lastPosition = Math.max(...positions);
    const losers = positions
      .reduce((winners, position, playerId) => [...winners, { position, name: players[playerId].name }], [] as { position: number; name: string }[])
      .filter((v) => v.position === lastPosition)
      .map((v) => v.name);
    return this.formatter.format(losers);
  }

  public getMaximumScoreInOneRound(): number {
    return Math.max(...this.gameHolderService.service.players.flatMap((p) => p.scores));
  }

  public getPlayerNamesWithMaximumScoreInOneRound(): string {
    const maxScore = this.getMaximumScoreInOneRound();
    const players = this.gameHolderService.service.players.filter((p) => p.scores.includes(maxScore)).map((p) => p.name);
    return this.formatter.format(players);
  }

  public getMinimumScoreInOneRound(): number {
    return Math.min(...this.gameHolderService.service.players.flatMap((p) => p.scores));
  }

  public getPlayerNamesWithMinimumScoreInOneRound(): string {
    const minScore = this.getMinimumScoreInOneRound();
    const players = this.gameHolderService.service.players.filter((p) => p.scores.includes(minScore)).map((p) => p.name);
    return this.formatter.format(players);
  }
}
