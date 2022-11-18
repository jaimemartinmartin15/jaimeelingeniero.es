import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit, AfterViewInit {
  // game name
  public selectGameNameDropDownOpen = false;
  public selectedGameName = 'pocha';
  public gameNames = ['pocha', 'chinchon', 'uno'];

  // number of cards
  public selectedNumberOfCards = 40;
  public lastScrollPosition = 0;
  @ViewChild('numberOfCards')
  public numberOfCardsContainer: ElementRef<HTMLDivElement>;

  public constructor() {}

  public ngOnInit() {}

  public onSelectGameName(gameName: string) {
    this.selectedGameName = gameName;
    this.selectGameNameDropDownOpen = false;
  }

  public ngAfterViewInit(): void {
    this.numberOfCardsContainer.nativeElement.scroll(50, 0);
  }

  public calculateNumberOfSelectedCards() {
    const scrollContainer = this.numberOfCardsContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.selectedNumberOfCards--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.selectedNumberOfCards++;
      scrollContainer.scroll(50, 0);
    }
  }

  // public onConfirmStartGame(output: StartGamePopUpOutput) {
  //   // TODO replace or move to confirmation of game-config
  //   this.playersService.createPlayersWithNames(output.names);
  //   this.playersService.playersLoaded$.next();
  //   this.playersService.startsDealing = output.startsDealing;
  // }
}
