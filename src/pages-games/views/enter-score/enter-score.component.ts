import { AnimationBuilder } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameHolderService } from 'src/pages-games/game-services/game-holder.service';
import { LOCAL_STORE_KEYS } from 'src/pages-games/local-storage-keys';
import { Player } from 'src/pages-games/player';
import { playPlayerTransitionAnimation } from './enter-score.animation';

@Component({
  selector: 'app-enter-score',
  templateUrl: './enter-score.component.html',
  styleUrls: ['./enter-score.component.scss'],
})
export class EnterScoreComponent {
  @ViewChild('playersContainer') playersContainerElement: ElementRef;

  public players: Player[];
  public roundNumber: number;

  public currentPlayer = 0;
  public sign: '+' | '-' = '+';

  public get puntuationCurrentPlayer() {
    return this.players[this.currentPlayer].punctuation;
  }

  public set puntuationCurrentPlayer(punctuation: number) {
    this.players[this.currentPlayer].punctuation = punctuation;
  }

  public constructor(
    private readonly animationBuilder: AnimationBuilder,
    private readonly location: Location,
    private readonly router: Router,
    private readonly gameHolderService: GameHolderService
  ) {
    this.roundNumber = this.router.getCurrentNavigation()?.extras?.state?.['roundNumber'];
    this.players = this.router.getCurrentNavigation()?.extras?.state?.['players'];
    this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
  }

  public closeEnterScore() {
    this.location.back();
  }

  public onClickKeyBoard(event: Event) {
    const buttonKey = (event.target as HTMLElement).textContent;

    if (buttonKey === '→' || buttonKey === '✔️') {
      this.goNextPlayer();
      return;
    }

    if (buttonKey === '←') {
      this.goPreviousPlayer();
      return;
    }

    if (buttonKey === '⌫') {
      this.puntuationCurrentPlayer = +`${this.puntuationCurrentPlayer}`.slice(0, -1);
      if (Number.isNaN(this.puntuationCurrentPlayer)) {
        // in case only the '-' is in the string, replace with 0
        this.puntuationCurrentPlayer = 0;
        this.sign = '+';
      }
      return;
    }

    if (buttonKey === '±') {
      this.sign = this.sign === '-' ? '+' : '-';
      this.puntuationCurrentPlayer = -this.puntuationCurrentPlayer;
      return;
    }

    // user pressed number key
    const key = +buttonKey!;
    this.puntuationCurrentPlayer = +`${this.sign}${Math.abs(this.puntuationCurrentPlayer)}${key}`;
  }

  private goNextPlayer() {
    if (++this.currentPlayer == this.players.length) {
      // change the player that deals only if it is a new round (not edition in table view)
      if (this.roundNumber === this.gameHolderService.service.getNextRoundNumber()) {
        this.gameHolderService.service.setNextDealingPlayer();
      }
      this.players.forEach((p) => (p.scores[this.roundNumber - 1] = p.punctuation));
      this.saveGameLocalStorage();
      this.location.back();
      return;
    }

    playPlayerTransitionAnimation(this.animationBuilder, this.currentPlayer, this.playersContainerElement);
    this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
  }

  private goPreviousPlayer() {
    if (this.currentPlayer > 0) {
      this.currentPlayer--;
      this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
      playPlayerTransitionAnimation(this.animationBuilder, this.currentPlayer, this.playersContainerElement);
    }
  }

  private saveGameLocalStorage() {
    localStorage.setItem(LOCAL_STORE_KEYS.PLAYERS, JSON.stringify(this.gameHolderService.service.players));
    localStorage.setItem(
      LOCAL_STORE_KEYS.CONFIG,
      JSON.stringify({
        numberOfCards: this.gameHolderService.service.numberOfCards,
        limitScore: this.gameHolderService.service.limitScore,
        winner: this.gameHolderService.service.winner,
      })
    );
    localStorage.setItem(LOCAL_STORE_KEYS.DEALING_PLAYER_INDEX, JSON.stringify(this.gameHolderService.service.dealingPlayerIndex));
    localStorage.setItem(LOCAL_STORE_KEYS.GAME_NAME, this.gameHolderService.service.gameName);
    localStorage.setItem(LOCAL_STORE_KEYS.TIME_LAST_GAME, JSON.stringify(Date.now()));
  }
}
