import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { GameService } from 'src/pages-games/game-services/game.service';
import { GAME_SERVICES } from 'src/pages-games/pages-games.module';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit, AfterViewInit {
  public selectGameNameDropDownOpen = false;

  @ViewChild('numberOfCards')
  public numberOfCardsContainer: ElementRef<HTMLDivElement>;

  @ViewChild('limitScore')
  public limitScoreContainer: ElementRef<HTMLDivElement>;

  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(GAME_SERVICES) public gameServices: GameService[],
    public readonly gameHolderService: GameHolderService
  ) {}

  public ngOnInit() {
    // TODO load possible player names from previous game
  }

  public ngAfterViewInit(): void {
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
  }

  public onSelectGameName(gameService: GameService) {
    this.selectGameNameDropDownOpen = false;
    this.gameHolderService.service = gameService;

    this.changeDetectorRef.detectChanges();
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
  }

  public calculateNumberOfSelectedCards() {
    const scrollContainer = this.numberOfCardsContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.gameHolderService.service.numberOfCards--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.gameHolderService.service.numberOfCards++;
      scrollContainer.scroll(50, 0);
    }
  }

  public get getNumberOfCards(): number {
    return this.gameHolderService.service.numberOfCards;
  }

  public set setNumberOfCards(value: number) {
    this.gameHolderService.service.numberOfCards = value;
  }

  public calculateLimitScore() {
    const scrollContainer = this.limitScoreContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.gameHolderService.service.limitScore--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.gameHolderService.service.limitScore++;
      scrollContainer.scroll(50, 0);
    }
  }

  public get getLimitScore(): number {
    return this.gameHolderService.service.limitScore;
  }

  public set setLimitScore(value: number) {
    this.gameHolderService.service.limitScore = value;
  }

  public setWinnerConfigHighestScore() {
    this.gameHolderService.service.winner = 'highestScore';
  }

  public setWinnerConfigLowestScore() {
    this.gameHolderService.service.winner = 'lowestScore';
  }
}
