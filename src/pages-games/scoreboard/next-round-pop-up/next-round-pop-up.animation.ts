import { animate, style, transition, trigger } from '@angular/animations';

export const transitionNextPlayer = trigger('transitionNextPlayer', [
  transition(':enter', [style({ transform: 'translateX(200%)' }), animate('400ms', style({ transform: 'translateX(0)' }))]),
  transition(':leave', [animate('400ms', style({ transform: 'translateX(-200%)' }))]),
]);
