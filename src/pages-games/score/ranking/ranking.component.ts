import { Component, OnInit } from '@angular/core';
import { PREVIOUS_GAME_DATE_KEY } from '../local-storage-keys';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  public showRestartGamePopUp = false;

  public ngOnInit(): void {
    this.checkRestartGame();
  }

  private checkRestartGame() {
    const lastSavedGameDate = localStorage.getItem(PREVIOUS_GAME_DATE_KEY);
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    if (lastSavedGameDate != null && Date.now() - +lastSavedGameDate < twoHoursAgo) {
      this.showRestartGamePopUp = true;
    }
  }

  public onConfirmRestartGame(restartGame: boolean) {
    this.showRestartGamePopUp = false;

    // TODO
  }
}
