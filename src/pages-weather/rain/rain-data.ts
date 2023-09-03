import { DATE_SEPARATOR } from './constants';
import { FileLine } from './file-line';

export class RainData {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;
  private _liters: number;
  private _hasLiters: boolean;
  public readonly bulletColor: string;
  public readonly popUpContent: string;
  public readonly hasMessage: boolean;
  public svgOffset = 0;

  public constructor(line: FileLine) {
    const splitDate = line.date.split(DATE_SEPARATOR);
    this.day = +splitDate[0].trim();
    this.month = +splitDate[1].trim() - 1;
    this.year = +splitDate[2].trim();
    this._liters = +line.liters;
    this._hasLiters = line.liters !== '';
    this.bulletColor = line.bulletColor;
    this.popUpContent = line.popUpContent;
    this.hasMessage = line.popUpContent !== '';
  }

  public get liters(): number {
    return this._liters;
  }

  public set liters(value: number) {
    this._liters = value;
    this._hasLiters = true;
  }

  public get hasLiters(): boolean {
    return this._hasLiters;
  }
}
