import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MONTHS } from 'src/utils/dates';
import { RainData } from './rain-data';
import { RainDataService } from './rain-data.service';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
  providers: [RainDataService],
})
export class RainComponent implements OnInit, AfterViewInit {
  @ViewChild('monthGraphicScroller', { static: false }) monthGraphicScrollerRef: ElementRef;
  @ViewChild('yearGraphicScroller', { static: false }) yearGraphicScrollerRef: ElementRef;

  public readonly MONTHS = MONTHS;
  public readonly popUp = { show: false, content: '' };

  public selectedYear = new Date().getFullYear();
  public selectedMonth = new Date().getMonth();

  // TODO populate previous and next arrays
  public previousDaysRainData: RainData[] = [];
  public daysRainData: RainData[] = [];
  public nextDaysRainData: RainData[] = [];

  public previousMonthsRainData: RainData[] = [];
  public monthsRainData: RainData[] = [];
  public nextMonthsRainData: RainData[] = [];

  public constructor(public readonly rainDataService: RainDataService, private readonly activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.rainDataService.setData(this.activatedRoute.snapshot.data['rainData']);
    this.updateArraysRainData();
  }

  private updateArraysRainData() {
    this.previousDaysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(
      this.selectedMonth > 0 ? this.selectedMonth - 1 : 11,
      this.selectedMonth > 0 ? this.selectedYear : this.selectedYear - 1
    );
    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
    this.nextDaysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(
      this.selectedMonth < 11 ? this.selectedMonth + 1 : 0,
      this.selectedMonth < 11 ? this.selectedYear : this.selectedYear + 1
    );
    this.previousMonthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedMonth > 0 ? this.selectedYear : this.selectedYear - 1);
    this.monthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
    this.nextMonthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedMonth < 11 ? this.selectedYear : this.selectedYear + 1);
  }

  public ngAfterViewInit(): void {
    // starts the scrolling in the middle element
    this.monthGraphicScrollerRef.nativeElement.scrollLeft = this.monthGraphicScrollerRef.nativeElement.clientWidth;
    this.yearGraphicScrollerRef.nativeElement.scrollLeft = this.yearGraphicScrollerRef.nativeElement.clientWidth;
  }

  public showBadgeForMonth(monthsArray: RainData[], month: number): boolean {
    return monthsArray.find((m) => m.date.getMonth() === month)?.popUpContent != undefined;
  }

  public isTotalAmountOfLitersAvailableForMonth(monthsArray: RainData[], month: number): boolean {
    return monthsArray.filter((m) => !m.isFake).find((m) => m.date.getMonth() === month) != undefined;
  }

  public totalAmountOfLitersInMonth(monthsArray: RainData[], month: number): number {
    return monthsArray.find((m) => m.date.getMonth() === month)!.liters;
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
  }

  public showNextMonth() {
    this.selectedMonth++;
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0; // set January next year
      this.selectedYear++;
    }

    this.updateArraysRainData();
  }

  public getFirstDayOfMonthWeekDayIndex(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }

  public isDataAvailableForEachDayOfMonth(daysArray: RainData[]): boolean {
    return !daysArray.every((d) => d.isFake);
  }

  public isTotalAmountOfLitersAvailableForYear(monthsArray: RainData[]): boolean {
    return monthsArray.some((m) => !m.isFake);
  }

  public getTotalAmountOfLitersInYear(monthsArray: RainData[]): number {
    return monthsArray.map((m) => m.liters).reduce((a, b) => a + b, 0);
  }

  public showPreviousYear() {
    this.selectedYear--;
    this.updateArraysRainData();
  }

  public showNextYear() {
    this.selectedYear++;
    this.updateArraysRainData();
  }

  public isDataAvailableForYear(monthsArray: RainData[]) {
    return monthsArray.some((m) => !m.isFake);
  }

  public selectMonthOfSelectedYear(month: number) {
    this.selectedMonth = month;
    this.updateArraysRainData();
  }

  public showPopUpForMonth(monthsArray: RainData[], month: number) {
    const foundMonth = monthsArray.find((m) => m.date.getMonth() === month);
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

  public onScrollingMonth(e: Event) {
    const scroller = e.target as HTMLDivElement;
    const childrenWidth = scroller.children[0].clientWidth;
    const gapSize = 30; // 30 px as in scss file in .graphic-scroller class

    // check if the scroll is multiple of a child width taking into account the gap
    if (scroller.scrollLeft % (childrenWidth + gapSize) === 0) {
      if (scroller.scrollLeft === 0) {
        // scroll to previous month
        scroller.scrollLeft = childrenWidth + gapSize;
        this.showPreviousMonth();
      } else if (scroller.scrollLeft === (childrenWidth + gapSize) * 2) {
        // scroll to next month
        scroller.scrollLeft = childrenWidth + gapSize;
        this.showNextMonth();
      }
    }
  }

  public onScrollingYear(e: Event) {
    const scroller = e.target as HTMLDivElement;
    const childrenWidth = scroller.children[0].clientWidth;
    const gapSize = 30; // 30 px as in scss file in .graphic-scroller class

    // check if the scroll is multiple of a child width taking into account the gap
    if (scroller.scrollLeft % (childrenWidth + gapSize) === 0) {
      if (scroller.scrollLeft === 0) {
        // scroll to previous year
        scroller.scrollLeft = childrenWidth + gapSize;
        this.showPreviousYear();
      } else if (scroller.scrollLeft === (childrenWidth + gapSize) * 2) {
        // scroll to next year
        scroller.scrollLeft = childrenWidth + gapSize;
        this.showNextYear();
      }
    }
  }
}
