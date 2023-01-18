import { Component, OnInit } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { LOCAL_STORE_KEYS } from 'src/pages-games/local-storage-keys';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public playedTime: string;
  private formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

  public constructor(public readonly gameHolderService: GameHolderService) {}

  public ngOnInit(): void {
    this.setPlayedTime();
  }

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

  private setPlayedTime() {
    const timeGameStarted = +localStorage.getItem(LOCAL_STORE_KEYS.TIME_GAME_STARTS)!;
    const elapsedSeconds = (Date.now() - timeGameStarted) / 1e3;
    const minutes = Math.trunc((elapsedSeconds / 60) % 60);
    const hours = Math.trunc(elapsedSeconds / 3600);
    if (hours > 0) {
      this.playedTime = `${hours} ${hours == 1 ? ' hora' : ' horas'}`;
    }
    if (minutes > 0 && hours > 0) {
      this.playedTime = `${this.playedTime} y ${minutes} ${minutes == 1 ? ' minuto' : ' minutos'}`;
    } else if (minutes > 0) {
      this.playedTime = `${minutes} ${minutes == 1 ? ' minuto' : ' minutos'}`;
    }

    if (hours == 0 && minutes == 0) {
      this.playedTime = 'Menos de un minuto';
    }
  }
}
