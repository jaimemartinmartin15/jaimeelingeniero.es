import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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

  public constructor(@Inject(GAME_SERVICES) public gameServices: GameService[], public readonly gameHolderService: GameHolderService) {}

  public ngOnInit() {
    // TODO load possible player names from previous game
  }

  public ngAfterViewInit(): void {
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
  }

  public onSelectGameName(gameService: GameService) {
    this.selectGameNameDropDownOpen = false;
    this.gameHolderService.service = gameService;
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
}
