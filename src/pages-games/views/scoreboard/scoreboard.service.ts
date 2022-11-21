import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ScoreboardService {
  public readonly enterRound$ = new Subject<number>();
  public readonly enterPunctuationForRoundAndPlayer$ = new Subject<{ player: number; round: number }>();
}
