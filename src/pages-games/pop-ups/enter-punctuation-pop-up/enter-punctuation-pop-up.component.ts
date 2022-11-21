import { AnimationBuilder } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { playPlayerTransitionAnimation } from './enter-punctuation-pop-up.animation';
import { EnterPunctuationPopUpInput, EnterPunctuationPopUpOutput } from './enter-punctuation-pop-up.contract';

@Component({
  selector: 'app-enter-punctuation-pop-up',
  templateUrl: './enter-punctuation-pop-up.component.html',
  styleUrls: ['./enter-punctuation-pop-up.component.scss'],
})
export class EnterPunctuationPopUpComponent implements OnInit {
  @ViewChild('playersContainer') playersContainerElement: ElementRef;

  @Input()
  public enterPunctuationPopUpInput: EnterPunctuationPopUpInput;

  @Output()
  public enterPunctuationPopUpOutput = new EventEmitter<EnterPunctuationPopUpOutput>();

  @Output()
  public closePopUp = new EventEmitter<void>();

  public currentPlayer = 0;
  public sign: '+' | '-' = '+';

  public constructor(private readonly animationBuilder: AnimationBuilder) {}

  public ngOnInit(): void {
    this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
  }

  public onClickKeyBoard(event: Event) {
    if (Number.isNaN(+(event.target as HTMLElement).textContent!)) {
      switch ((event.target as HTMLElement).textContent) {
        case '↩':
          this.puntuationCurrentPlayer = +`${this.puntuationCurrentPlayer}`.slice(0, -1);
          if (Number.isNaN(this.puntuationCurrentPlayer)) {
            // in case only the '-' is in the string, replace with 0
            this.puntuationCurrentPlayer = 0;
            this.sign = '+';
          }
          break;
        case '-':
          this.sign = this.sign === '-' ? '+' : '-';
          this.puntuationCurrentPlayer = -this.puntuationCurrentPlayer;
          break;
      }
    } else {
      // user pressed number key
      const key = +(event.target as HTMLElement).textContent!;
      this.puntuationCurrentPlayer = +`${this.sign}${Math.abs(this.puntuationCurrentPlayer)}${key}`;
    }
  }

  public goNextPlayer() {
    if (++this.currentPlayer == this.enterPunctuationPopUpInput.players.length) {
      this.enterPunctuationPopUpOutput.emit({
        round: this.enterPunctuationPopUpInput.round,
        players: this.enterPunctuationPopUpInput.players,
      });
      return;
    }

    playPlayerTransitionAnimation(this.animationBuilder, this.currentPlayer, this.playersContainerElement);
    this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
  }

  public goPreviousPlayer() {
    if (this.currentPlayer > 0) {
      this.currentPlayer--;
      this.sign = this.puntuationCurrentPlayer >= 0 ? '+' : '-';
      playPlayerTransitionAnimation(this.animationBuilder, this.currentPlayer, this.playersContainerElement);
    }
  }

  public get puntuationCurrentPlayer() {
    return this.enterPunctuationPopUpInput.players[this.currentPlayer].punctuation;
  }

  public set puntuationCurrentPlayer(puntuation: number) {
    this.enterPunctuationPopUpInput.players[this.currentPlayer].punctuation = puntuation;
  }
}
