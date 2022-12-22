import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('graph')
  private readonly graph: ElementRef;

  public viewBox: string;
  public showPlayerGraphLines: boolean[];
  public colors: string[] = ['#ff0000', '#0000ff', '#008000', '#804000', '#4cd3d3', '#9d9d9d', '#c32aed', '#e0e000'];
  public playerLines: string[];

  public showRoundPanel = false;
  public svgSelectedRound: { x1: number; y1: number; x2: number; y2: number };
  public selectedRound: number;
  public roundPanelPlayers: Player[];
  public playerMovements: number[];

  public constructor(public readonly gameHolderService: GameHolderService) {}

  public ngOnInit(): void {
    this.viewBox = `0 0 ${this.gameHolderService.service.svgWidth + 1} ${this.gameHolderService.service.svgHeight}`;
    this.showPlayerGraphLines = new Array(this.gameHolderService.service.players.length).fill(true);
    this.createColorsForPlayers();
    this.playerLines = this.gameHolderService.service.players.map((p) => this.gameHolderService.service.getSvgPlayerLine(p));
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
      text: { x: svgRoundWidth * m * showEvery - 5, y: -this.gameHolderService.service.svgXAxisHeight - 4 },
      line: {
        x1: svgRoundWidth * m * showEvery,
        y1: 0,
        x2: svgRoundWidth * m * showEvery,
        y2: this.gameHolderService.service.svgHeight,
      },
    }));
  }

  public onClickToShowPlayersPanelInfo(event: MouseEvent): void {
    const previousSelectedRound = this.selectedRound;
    this.selectedRound = this.calculateSelectedRoundAndSvg({ x: event.offsetX, y: event.offsetY });

    if (previousSelectedRound === this.selectedRound) {
      this.selectedRound = -1;
      this.showRoundPanel = false;
      return;
    }

    this.roundPanelPlayers = this.gameHolderService.service.getRankingPlayers(this.selectedRound);

    if (this.selectedRound > 1) {
      const positionsBefore = this.gameHolderService.service.players.map((p) =>
        this.gameHolderService.service.getPlayerPosition(p.id, this.selectedRound - 1)
      );
      const positionsNow = this.gameHolderService.service.players.map((p) =>
        this.gameHolderService.service.getPlayerPosition(p.id, this.selectedRound)
      );
      this.playerMovements = this.gameHolderService.service.players.map((p) => positionsBefore[p.id] - positionsNow[p.id]);
    }

    this.showRoundPanel = true;
  }

  private calculateSelectedRoundAndSvg({ x: xCoord, y: yCoord }: { x: number; y: number }): number {
    // convert click in screen to coordinates in svg
    const point = DOMPoint.fromPoint(this.graph.nativeElement);
    point.x = xCoord;
    point.y = yCoord;
    const svgXCoord = point.matrixTransform(this.graph.nativeElement.getScreenCTM().inverse()).x;

    // calculate the round
    const numberOfRounds = this.gameHolderService.service.getNextRoundNumber() - 1;
    const roundWidth = this.gameHolderService.service.svgWidth / numberOfRounds;
    const roundsPositions = intervalArray(numberOfRounds).map((r) => r * roundWidth);
    const minimumDistanceToRound = Math.min(...roundsPositions.map((rp) => Math.abs(svgXCoord - rp)));

    this.svgSelectedRound = {
      x1: roundsPositions.find((rp) => Math.abs(svgXCoord - rp) === minimumDistanceToRound)!,
      y1: 0,
      x2: roundsPositions.find((rp) => Math.abs(svgXCoord - rp) === minimumDistanceToRound)!,
      y2: this.gameHolderService.service.svgHeight,
    };

    return roundsPositions.indexOf(this.svgSelectedRound.x1) + 1;
  }
}
