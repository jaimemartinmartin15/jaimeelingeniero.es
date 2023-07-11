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
    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
    this.monthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
  }

  public ngAfterViewInit(): void {
    // starts the scrolling in the middle element
    this.monthGraphicScrollerRef.nativeElement.scrollLeft = this.monthGraphicScrollerRef.nativeElement.clientWidth;
    this.yearGraphicScrollerRef.nativeElement.scrollLeft = this.yearGraphicScrollerRef.nativeElement.clientWidth;
  }

  public get showBadgeForSelectedMonthAndYear(): boolean {
    return this.monthsRainData.find((m) => m.date.getMonth() === this.selectedMonth)?.popUpContent != undefined;
  }

  public get isTotalAmountOfLitersAvailableForSelectedMonthAndYear(): boolean {
    return this.monthsRainData.filter((m) => !m.isFake).find((m) => m.date.getMonth() === this.selectedMonth) != undefined;
  }

  public get totalAmountOfLitersInSelectedMonthAndYear(): number {
    return this.monthsRainData.find((m) => m.date.getMonth() === this.selectedMonth)!.liters;
  }

  public get weatherIcon(): string {
    if (this.selectedMonth < 3) return '❄️';
    if (this.selectedMonth < 6) return '🌹';
    if (this.selectedMonth < 9) return '☀️';
    return '🍁';
  }

  public showPreviousMonth() {
    this.selectedMonth--;
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11; // set December last year
      this.selectedYear--;
      this.monthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
    }

    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
  }

  public showNextMonth() {
    this.selectedMonth++;
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0; // set January next year
      this.selectedYear++;
      this.monthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
    }

    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
  }

  public get firstDayOfMonthWeekDayIndex(): number {
    return new Date(this.selectedYear, this.selectedMonth, 1).getDay();
  }

  public get isDataAvailableForSelectedMonth(): boolean {
    return this.daysRainData.every((d) => d.isFake);
  }

  public get isTotalAmountOfLitersAvailableForSelectedYear(): boolean {
    return this.monthsRainData.some((m) => !m.isFake);
  }

  public get totalAmountOfLitersInSelectedYear(): number {
    return this.monthsRainData.map((m) => m.liters).reduce((a, b) => a + b, 0);
  }

  public showPreviousYear() {
    this.selectedYear--;
    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
    this.monthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
  }

  public showNextYear() {
    this.selectedYear++;
    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
    this.monthsRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
  }

  public isDataAvailableForSelectedYear() {
    return this.monthsRainData.some((m) => !m.isFake);
  }

  public selectMonthOfSelectedYear(month: number) {
    this.selectedMonth = month;
    this.daysRainData = this.rainDataService.getRainDataForDaysInMonthAndYear(this.selectedMonth, this.selectedYear);
  }

  public showPopUpForSelectedMonth() {
    const month = this.monthsRainData.find((m) => m.date.getMonth() === this.selectedMonth && m.date.getFullYear() === this.selectedYear);
    if (month?.popUpContent !== undefined) {
      this.popUp.show = true;
      this.popUp.content = month.popUpContent;
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

  public onScrollinYear(e: Event) {
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
