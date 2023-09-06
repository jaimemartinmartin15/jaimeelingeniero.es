import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MONTHS } from 'src/utils/dates';
import { RainData } from '../../rain-data';
import { RainDataService } from '../../rain-data.service';

@Component({
  selector: 'app-months-graphic',
  templateUrl: './months-graphic.component.html',
  styleUrls: ['./months-graphic.component.scss'],
})
export class MonthsGraphicComponent implements OnChanges {
  public readonly MONTHS = MONTHS;

  @Input()
  public selectedMonth: number;

  @Input()
  public year: number;

  @Input()
  public loading: boolean;

  @Input()
  public error: boolean;

  @Output()
  public showPopUp: EventEmitter<string> = new EventEmitter();

  @Output()
  public showPreviousYear: EventEmitter<void> = new EventEmitter();

  @Output()
  public showNextYear: EventEmitter<void> = new EventEmitter();

  @Output()
  public showMonth: EventEmitter<number> = new EventEmitter();

  public rainPerMonths: RainData[] = [];

  public constructor(private readonly rainDataService: RainDataService) {}

  public ngOnChanges() {
    this.rainPerMonths = this.rainDataService.getRainDataPerMonths(this.year);
  }

  public existsMessageForYear(): boolean {
    const years = this.rainDataService.getRainDataPerYear();
    const foundYear = years.find((y) => y.year === this.year);
    return foundYear != null && foundYear.hasMessage;
  }

  public getBadgeColorForYear(): string {
    const years = this.rainDataService.getRainDataPerYear();
    const foundYear = years.find((y) => y.year === this.year);
    if (foundYear != null && foundYear.hasMessage) {
      return foundYear.bulletColor;
    }

    return 'transparent';
  }

  public showYearPopUp() {
    const years = this.rainDataService.getRainDataPerYear();
    const foundYear = years.find((y) => y.year === this.year);
    if (foundYear != null && foundYear.hasMessage) {
      this.showPopUp.emit(foundYear.popUpContent);
    }
  }

  public isTotalAmountOfLitersAvailableForYear(): boolean {
    const years = this.rainDataService.getRainDataPerYear();
    const foundYear = years.find((y) => y.year === this.year);
    return !this.error && !this.loading && foundYear !== undefined && foundYear.hasLiters;
  }

  public totalAmountOfLitersInYear(): number {
    const years = this.rainDataService.getRainDataPerYear();
    const foundYear = years.find((y) => y.year === this.year);
    return foundYear!.liters;
  }
}
