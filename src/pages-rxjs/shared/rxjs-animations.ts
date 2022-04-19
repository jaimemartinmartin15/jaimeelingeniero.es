import { animate, sequence, style, transition, trigger } from '@angular/animations';

export const observableAnimation = trigger('observableAnimation', [
  transition(':enter', [
    style({ opacity: 0, maxHeight: '0' }),
    animate('500ms', style({ opacity: '1', maxHeight: '1000px' })),
  ]),
  transition(':leave', [
    sequence([
      animate('225ms', style({ opacity: '0' })), 
      animate('225ms', style({ width: '0', height: '0' })),
    ]),
  ]),
]);
