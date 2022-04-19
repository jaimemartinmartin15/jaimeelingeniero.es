import { animate, sequence, style, transition, trigger } from '@angular/animations';

export const observableAnimation = trigger('observableAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('250ms', style({ opacity: '1' })),
  ]),
  transition(':leave', [
    sequence([
      animate('225ms', style({ opacity: '0' })), 
      animate('225ms', style({ width: '0', height: '0' })),
    ]),
  ]),
]);
