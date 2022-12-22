import { Component, OnInit } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { Player } from 'src/pages-games/player';
import { intervalArray } from 'src/utils/arrays';
import { SvgRoundMarker } from './svg-round-marker';

@Component({
  selector: 'app-progress-graph',
  templateUrl: './progress-graph.component.html',
  styleUrls: ['./progress-graph.component.scss'],
})
export class ProgressGraphComponent implements OnInit {
  public viewBox: string;
  public showPlayerGraphLines: boolean[];
  public colors: string[] = ['#ff0000', '#0000ff', '#008000', '#804000', '#4cd3d3', '#9d9d9d', '#c32aed', '#e0e000'];
  public playerLines: string[];

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
    this.playerLines = this.gameHolderService.service.players.map(p => this.gameHolderService.service.getSvgPlayerLine(p))
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

  public get svgRoundMarkers(): SvgRoundMarker[] {
    const showEvery = 5;
    const numberOfMarkersToShow = (this.gameHolderService.service.getNextRoundNumber() - 1) / showEvery;
    const svgRoundWidth = this.gameHolderService.service.svgWidth / (this.gameHolderService.service.getNextRoundNumber() - 1);

    return intervalArray(numberOfMarkersToShow).map((m) => ({
      value: m * showEvery,
      text: { x: svgRoundWidth * m * showEvery - 5, y: 0 },
      line: {
        x1: svgRoundWidth * m * showEvery,
        y1: 0,
        x2: svgRoundWidth * m * showEvery,
        y2: this.gameHolderService.service.getViewBox().height,
      },
    }));
  }

  public onClickToShowPlayersPanelInfo(event: MouseEvent): void {
    // TODO
  }
}
