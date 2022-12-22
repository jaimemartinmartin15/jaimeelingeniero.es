import { Component, OnInit } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { Player } from 'src/pages-games/player';

@Component({
  selector: 'app-progress-graph',
  templateUrl: './progress-graph.component.html',
  styleUrls: ['./progress-graph.component.scss'],
})
export class ProgressGraphComponent implements OnInit {
  public viewBox: string;
  public showPlayerGraphLines: boolean[];
  public colors: string[] = ['#ff0000', '#0000ff', '#008000', '#804000', '#4cd3d3', '#9d9d9d', '#c32aed', '#e0e000'];

  public showRoundPanel = true; // TODO
  public selectedRound: number = 1; // TODO
  public roundPanelPlayers: Player[] = this.gameHolderService.service.players; // TODO
  public playerMovements: number[] = [1, 2, 3, -4]; // TODO

  public constructor(public readonly gameHolderService: GameHolderService) {}

  public ngOnInit(): void {
    const box = this.gameHolderService.service.getViewBox();
    this.viewBox = `0 0 ${box.widht} ${box.height}`;
    this.showPlayerGraphLines = new Array(this.gameHolderService.service.players.length).fill(true);
    this.createColorsForPlayers();
  }

  private createColorsForPlayers() {
    const numberOfPlayersToCreateColors = this.gameHolderService.service.players.length - this.colors.length;
    if (numberOfPlayersToCreateColors > 0) {
      const chars = '0123456789ABCDEF';
      for (let i = 0; i < numberOfPlayersToCreateColors; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
          color += chars[Math.floor(Math.random() * chars.length)];
        }
        this.colors.push(color);
      }
    }

    // adds transparency to all existing colors
    this.colors = this.colors.map((c) => c + 'CC');
  }

  public onClickToShowPlayersPanelInfo(event: MouseEvent): void {
    // TODO
  }
}
