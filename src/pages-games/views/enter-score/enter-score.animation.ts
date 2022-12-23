import { animate, AnimationBuilder, style } from '@angular/animations';
import { ElementRef } from '@angular/core';

export const playPlayerTransitionAnimation = (animationBuilder: AnimationBuilder, currentPlayer: number, playersContainerElement: ElementRef) => {
  let animationFactory = animationBuilder.build([style('*'), animate('300ms', style({ transform: `translateX(-${currentPlayer}00%)` }))]);
  animationFactory.create(playersContainerElement.nativeElement).play();
};
