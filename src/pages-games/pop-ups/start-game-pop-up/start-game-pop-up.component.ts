import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { PREVIOUS_GAME_KEY } from '../../local-storage-keys';
import { Player } from '../../services/player/player';
import { StartGamePopUpOutput } from './start-game-pop-up.contract';

@Component({
  selector: 'app-start-game-pop-up',
  templateUrl: './start-game-pop-up.component.html',
  styleUrls: ['./start-game-pop-up.component.scss'],
})
export class StartGamePopUpComponent implements OnInit {
  public startsDealing: number = 0;

  @ViewChildren('input')
  private inputs: QueryList<ElementRef>;

  @Output()
  public confirm = new EventEmitter<StartGamePopUpOutput>();

  public players: string[] = ['', '', '', ''];

  public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    const previousGame = localStorage.getItem(PREVIOUS_GAME_KEY);
    if (previousGame != null) {
      const { players }: { players: Player[] } = JSON.parse(previousGame);
      this.players = players.sort((p1, p2) => p1.id - p2.id).map((p) => p.name);
    }
  }

  public addPlayer() {
    this.players.push('');
    this.changeDetectorRef.detectChanges();
    this.inputs.last.nativeElement.focus();
  }

  public deletePlayer(index: number, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    const playerNameDealing = this.players[this.startsDealing];
    this.players.splice(index, 1);
    const playerNameDealingIndex = this.players.indexOf(playerNameDealing);
    this.startsDealing = playerNameDealingIndex !== -1 ? playerNameDealingIndex : this.startsDealing - 1 !== -1 ? this.startsDealing - 1 : 0;
  }

  public trackByPlayerIndex(index: number) {
    return index;
  }

  public onReorderingPlayer(event: CdkDragDrop<string[]>) {
    const playerNameDealing = this.players[this.startsDealing];
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
    this.startsDealing = this.players.indexOf(playerNameDealing);
  }

  public playersAreEntered(): boolean {
    return this.players.every((p) => p != '');
  }

  public onConfirm() {
    this.confirm.emit({ names: this.players, startsDealing: this.startsDealing });
  }
}
