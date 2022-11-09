import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PopUpsService {
  public readonly openStartNewGamePopUp$ = new Subject<void>();
  public readonly enterNewRound$ = new Subject<void>();
  public readonly enterRound$ = new Subject<number>();
  public readonly enterPunctuationForRoundAndPlayer$ = new Subject<{ player: number; round: number }>();
}
