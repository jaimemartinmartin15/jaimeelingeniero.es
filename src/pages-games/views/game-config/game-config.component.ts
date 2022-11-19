import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { chinchonConfig } from 'src/pages-games/services/game/game-configs/chinchon-config';
import { GameConfig } from 'src/pages-games/services/game/game-configs/game-config';
import { pochaConfig } from 'src/pages-games/services/game/game-configs/pocha-config';
import { unoConfig } from 'src/pages-games/services/game/game-configs/uno-config';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameConfigComponent implements AfterViewInit {
  private readonly availableConfigs = [pochaConfig, chinchonConfig, unoConfig];
  public selectedConfigGame: GameConfig = pochaConfig;

  // game name
  public selectGameNameDropDownOpen = false;
  public gameNames = this.availableConfigs.map((c) => c.name);

  // number of cards
  public selectedNumberOfCards = 40;
  @ViewChild('numberOfCards')
  public numberOfCardsContainer: ElementRef<HTMLDivElement>;

  // players
  @ViewChildren('playerInput')
  private playerInputs: QueryList<ElementRef>;
  public playerNames: string[] = ['', '', '', ''];
  public playerStartsDealing: number = 0;

  // winner
  public winner: 'highestScore' | 'lowestScore' = 'highestScore';

  // limit score
  public selectedLimitScore = 100;
  @ViewChild('limitScore')
  public limitScoreContainer: ElementRef<HTMLDivElement>;

  public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public onSelectGameName(gameName: string) {
    this.selectGameNameDropDownOpen = false;
    this.selectedConfigGame = this.availableConfigs.find((c) => c.name == gameName)!;
    this.changeDetectorRef.detectChanges();
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.selectedNumberOfCards = this.selectedConfigGame.cardsNumber ?? 40;
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
    this.selectedLimitScore = this.selectedConfigGame.limitScore ?? 100;
    this.changeDetectorRef.detectChanges();
  }

  public ngAfterViewInit(): void {
    this.numberOfCardsContainer?.nativeElement.scroll(50, 0);
    this.limitScoreContainer?.nativeElement.scroll(50, 0);
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

  public trackByPlayerIndex(index: number) {
    return index;
  }

  public addPlayer() {
    this.playerNames.push('');
    this.changeDetectorRef.detectChanges();
    this.playerInputs.last.nativeElement.focus();
  }

  public deletePlayer(index: number) {
    const playerNameDealing = this.playerNames[this.playerStartsDealing];
    this.playerNames.splice(index, 1);
    const playerNameDealingIndex = this.playerNames.indexOf(playerNameDealing);
    const playerBefore = this.playerStartsDealing - 1;
    this.playerStartsDealing = playerNameDealingIndex !== -1 ? playerNameDealingIndex : playerBefore !== -1 ? playerBefore : 0;
  }

  public onReorderingPlayer(event: CdkDragDrop<string[]>) {
    const playerNameDealing = this.playerNames[this.playerStartsDealing];
    moveItemInArray(this.playerNames, event.previousIndex, event.currentIndex);
    this.playerStartsDealing = this.playerNames.indexOf(playerNameDealing);
  }

  public calculateSelectedLimitScore() {
    const scrollContainer = this.limitScoreContainer.nativeElement;
    if (scrollContainer.scrollLeft === 0) {
      this.selectedLimitScore--;
      scrollContainer.scroll(50, 0);
    } else if (scrollContainer.scrollLeft === 100) {
      this.selectedLimitScore++;
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
