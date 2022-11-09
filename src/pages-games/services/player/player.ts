interface AccumulatedScore {
  beforeRejoin: number;
  afterRejoin: number;
}

interface Rejoin {
  afterRound: number;
  substractScore: number;
}

export interface IPlayer {
  id: number;
  name: string;
  scores: number[];
  accumulatedScores: AccumulatedScore[];
  position: number;
  rejoins: Rejoin[];
}

export class Player implements IPlayer {
  public punctuation = 0;

  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly scores: number[] = [],
    public accumulatedScores: AccumulatedScore[] = [{ beforeRejoin: 0, afterRejoin: 0 }],
    public position: number = 1,
    public readonly rejoins: Rejoin[] = []
  ) {}

  public get totalScore(): AccumulatedScore {
    return this.accumulatedScores[this.accumulatedScores.length - 1];
  }

  public get maximumAccumulatedScore(): number {
    return Math.max(...this.accumulatedScores.map((s) => s.beforeRejoin));
  }

  public get minimumAccumulatedScore(): number {
    return Math.min(...this.accumulatedScores.map((s) => s.beforeRejoin));
  }

  public get maximumScoreInOneRound(): number {
    return Math.max(...this.scores);
  }

  public get minimumScoreInOneRound(): number {
    return Math.min(...this.scores);
  }

  public setRoundValue(score: number, round: number = this.scores.length) {
    this.scores[round] = score;
  }

  public calculateAccumulatedScores(round = 0, limit = 0, scoreReset: number): void {
    const beforeRejoin = this.accumulatedScores[round].afterRejoin + this.scores[round];
    this.accumulatedScores[round + 1] = {
      beforeRejoin,
      afterRejoin: beforeRejoin > limit ? scoreReset : beforeRejoin,
    };
  }

  public calculateRejoins() {
    this.rejoins.length = 0;
    this.accumulatedScores.forEach((score, round) => {
      if (score.beforeRejoin != score.afterRejoin) {
        this.rejoins.push({
          afterRound: round,
          substractScore: score.afterRejoin - score.beforeRejoin,
        });
      }
    });
  }
}
