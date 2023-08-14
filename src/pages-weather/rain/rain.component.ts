import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MONTHS } from 'src/utils/dates';
import { RainData } from './rain-data';
import { RainDataService } from './rain-data.service';
import { SnapScrollHelper } from './snap-scroll-helper';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
  providers: [RainDataService],
})
export class RainComponent extends SnapScrollHelper implements OnInit, AfterViewInit {
  public readonly MONTHS = MONTHS;
  public readonly popUp = { show: false, content: '' };

  public selectedYear = new Date().getFullYear();
  public selectedMonth = new Date().getMonth();

  public daysGraphicPreviousRainData: RainData[] = [];
  public daysGraphicRainData: RainData[] = [];
  public daysGraphicNextRainData: RainData[] = [];

  public monthsGraphicPreviousRainData: RainData[] = [];
  public monthsGraphicRainData: RainData[] = [];
  public monthsGraphicNextRainData: RainData[] = [];

  public yearsGraphicRainData: RainData[] = [];
  public yearsGraphicSvgWidth: number = 0;

  public constructor(public readonly rainDataService: RainDataService, private readonly activatedRoute: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.rainDataService.setData(this.activatedRoute.snapshot.data['rainData']);
    this.updateArraysRainData();

    this.handleScrollSnapEvents();
    this.handleDaysGraphicScroll();
    this.handleMonthsGraphicScroll();
  }

  public ngAfterViewInit(): void {
    this.centerScrollingInstantly();

    this.updateHeightsOfGraphicWrappers();

    // min width of years-graphic (timeout to avoid error ExpressionChangedAfterItHasBeenCheckedError)
    setTimeout(() => {
      const boxWidth = this.yearsGraphicSvgWrapperRef.nativeElement.offsetWidth;
      const boxHeight = this.yearsGraphicSvgWrapperRef.nativeElement.offsetHeight;
      const relation = boxHeight / 325; //325 is viewBox in html file
      this.yearsGraphicSvgWidth =
        25 + this.yearsGraphicRainData.length * 30 < boxWidth / relation ? boxWidth / relation : 25 + this.yearsGraphicRainData.length * 30;
    }, 0);
  }

  private updateArraysRainData() {
    this.daysGraphicPreviousRainData = this.rainDataService.getRainDataPerDays(
      this.selectedMonth > 0 ? this.selectedMonth - 1 : 11,
      this.selectedMonth > 0 ? this.selectedYear : this.selectedYear - 1
    );
    this.daysGraphicRainData = this.rainDataService.getRainDataPerDays(this.selectedMonth, this.selectedYear);
    this.daysGraphicNextRainData = this.rainDataService.getRainDataPerDays(
      this.selectedMonth < 11 ? this.selectedMonth + 1 : 0,
      this.selectedMonth < 11 ? this.selectedYear : this.selectedYear + 1
    );

    this.monthsGraphicPreviousRainData = this.rainDataService.getRainDataPerMonths(this.selectedYear - 1);
    this.monthsGraphicRainData = this.rainDataService.getRainDataPerMonths(this.selectedYear);
    this.monthsGraphicNextRainData = this.rainDataService.getRainDataPerMonths(this.selectedYear + 1);

    this.yearsGraphicRainData = this.rainDataService.getRainDataPerYear();
  }

  public showBadgeForMonth(month: number, year: number): boolean {
    return this.rainDataService.getRainDataPerMonths(year).find((m) => m.date.getMonth() === month)?.popUpContent !== undefined;
  }

  public isTotalAmountOfLitersAvailableForMonth(month: number, year: number): boolean {
    return (
      this.rainDataService
        .getRainDataPerMonths(year)
        .filter((m) => !m.isFake)
        .find((m) => m.date.getMonth() === month) != undefined
    );
  }

  public totalAmountOfLitersInMonth(month: number, year: number): number {
    return this.rainDataService.getRainDataPerMonths(year).find((m) => m.date.getMonth() === month)!.liters;
  }

  public getWeatherIcon(month: number): string {
    if (month < 3) return '❄️';
    if (month < 6) return '🌹';
    if (month < 9) return '☀️';
    return '🍁';
  }

  public showPreviousMonth() {
    this.selectedMonth--;
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11; // set December last year
      this.selectedYear--;
    }

    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }

  public showNextMonth() {
    this.selectedMonth++;
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0; // set January next year
      this.selectedYear++;
    }

    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }

  public getFirstDayOfMonthWeekDayIndex(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }

  public isTotalAmountOfLitersAvailableForYear(year: number): boolean {
    return this.rainDataService.getRainDataPerYear().find((y) => y.date.getFullYear() === year) !== undefined;
  }

  public getTotalAmountOfLitersInYear(year: number): number {
    return this.rainDataService.getRainDataPerYear().find((y) => y.date.getFullYear() === year)!.liters;
  }

  public showPreviousYear() {
    this.selectedYear--;
    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }

  public showNextYear() {
    this.selectedYear++;
    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }

  public selectMonthOfSelectedYear(month: number) {
    this.selectedMonth = month;
    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }

  public showPopUpForMonth(month: number, year: number) {
    const foundMonth = this.rainDataService.getRainDataPerMonths(year).find((m) => m.date.getMonth() === month);
    if (foundMonth?.popUpContent !== undefined) {
      this.popUp.show = true;
      this.popUp.content = foundMonth.popUpContent;
    }
  }

  public showPopUpForDay(day: RainData) {
    if (day.popUpContent !== undefined) {
      this.popUp.show = true;
      this.popUp.content = day.popUpContent;
    }
  }

  public selectYear(year: number) {
    this.selectedYear = year;
    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }
}
