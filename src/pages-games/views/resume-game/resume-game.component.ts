import { Component, OnInit } from '@angular/core';
import { LOCAL_STORE_KEYS } from 'src/pages-games/local-storage-keys';

@Component({
  selector: 'app-resume-game',
  templateUrl: './resume-game.component.html',
  styleUrls: ['./resume-game.component.scss'],
})
export class ResumeGameComponent implements OnInit {
  public gameName: string;
  public showGameName = true;

  public constructor() {}

  public ngOnInit() {
    this.gameName = localStorage.getItem(LOCAL_STORE_KEYS.GAME_NAME)?.toLowerCase() as string;
    this.showGameName = this.gameName != undefined && this.gameName != 'otro';
  }
}
