import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Output, EventEmitter, OnInit, ViewChildren, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { PREVIOUS_GAME_KEY } from '../local-storage-keys';
import { Player } from '../player/player';
import { StartGamePopUpOutput } from './start-game-pop-up.contract';

@Component({
  selector: 'app-start-game-pop-up',
  templateUrl: './start-game-pop-up.component.html',
  styleUrls: ['./start-game-pop-up.component.scss'],
})
export class StartGamePopUpComponent implements OnInit {
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
    this.players.splice(index, 1);
  }

  public trackByPlayerIndex(index: number) {
    return index;
  }

  public onReorderingPlayer(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  public playersAreEntered(): boolean {
    return this.players.every((p) => p != '');
  }

  public onConfirm() {
    this.confirm.emit(this.players);
  }
}
