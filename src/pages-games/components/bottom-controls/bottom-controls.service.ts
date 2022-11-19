import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BottomControlsService {
  public readonly onClickStartGameButton$ = new Subject<void>();
  public readonly enableStartGameButton$ = new Subject<boolean>();
}
