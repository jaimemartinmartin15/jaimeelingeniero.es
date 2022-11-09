export interface IPlayer {
  id: number;
  name: string;
  scores: number[];
  accumulatedScores: number[];
  position: number;
  rejoins: { afterRound: number; withScore: number }[];
}

export class Player implements IPlayer {
  public punctuation = 0;

  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly scores: number[] = [],
    public accumulatedScores: number[] = [0],
    public position: number = 1,
    public readonly rejoins: { afterRound: number; withScore: number }[] = []
  ) {}

  public get totalScore(): number {
    return this.accumulatedScores[this.accumulatedScores.length - 1];
  }

  public get maximumAccumulatedScore(): number {
    return Math.max(...this.accumulatedScores);
  }

  public get minimumAccumulatedScore(): number {
    return Math.min(...this.accumulatedScores);
  }

  public get maximumScoreInOneRound(): number {
    return Math.max(...this.scores);
  }

  public get minimumScoreInOneRound(): number {
    return Math.min(...this.scores);
  }

  public setRoundValue(score: number, round: number = this.scores.length) {
    this.scores[round] = score;
    this.accumulatedScores = this.calculateAccumulatedScores();
  }

  private calculateAccumulatedScores(): number[] {
    return this.scores.reduce((prev, current) => [...prev, prev[prev.length - 1] + current], [0]);
  }
}
