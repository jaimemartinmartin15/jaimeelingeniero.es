import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, debounceTime, filter, merge } from 'rxjs';
import { MONTHS } from 'src/utils/dates';
import { RainData } from './rain-data';
import { RainDataService } from './rain-data.service';

const GAP_SIZE = 30; // 30 px as in scss file in .graphic-scroller class

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
  providers: [RainDataService],
})
export class RainComponent implements OnInit, AfterViewInit {
  @ViewChild('monthGraphicScroller', { static: false }) private monthGraphicScrollerRef: ElementRef;
  @ViewChild('yearGraphicScroller', { static: false }) private yearGraphicScrollerRef: ElementRef;

  private get monthScrollerEl(): HTMLDivElement {
    return this.monthGraphicScrollerRef.nativeElement;
  }

  private get yearScrollerEl(): HTMLDivElement {
    return this.yearGraphicScrollerRef.nativeElement;
  }

  // hanling of custom snap-scroll
  private touchEnded$ = new BehaviorSubject<boolean>(true);
  public monthGraphicScrollEvents$ = new Subject<void>();
  public yearGraphicScrollEvents$ = new Subject<void>();

  public readonly MONTHS = MONTHS;
  public readonly popUp = { show: false, content: '' };

  public selectedYear = new Date().getFullYear();
  public selectedMonth = new Date().getMonth();

  public previousDaysRainData: RainData[] = [];
  public daysRainData: RainData[] = [];
  public nextDaysRainData: RainData[] = [];

  public previousMonthsRainData: RainData[] = [];
  public monthsRainData: RainData[] = [];
  public nextMonthsRainData: RainData[] = [];

  public previousYearRainData: RainData[] = [];
  public yearRainData: RainData[] = [];
  public nextYearRainData: RainData[] = [];

  public constructor(public readonly rainDataService: RainDataService, private readonly activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.rainDataService.setData(this.activatedRoute.snapshot.data['rainData']);
    this.updateArraysRainData();

    this.handleScrollSnapEvents();
  }

  public ngAfterViewInit(): void {
    // starts the scrolling in the middle element
    this.monthScrollerEl.scrollTo({
      top: 0,
      left: this.monthScrollerEl.clientWidth + GAP_SIZE,
      behavior: 'instant' as ScrollBehavior,
    });
    this.yearScrollerEl.scrollTo({
      top: 0,
      left: this.yearScrollerEl.clientWidth + GAP_SIZE,
      behavior: 'instant' as ScrollBehavior,
    });

    this.updateHeightsOfGraphicWrappers();
  }

  @HostListener('touchstart')
  public onTouchStart() {
    this.touchEnded$.next(false);
  }

  @HostListener('touchend')
  public onTouchEnd() {
    this.touchEnded$.next(true);
  }

  private handleScrollSnapEvents() {
    merge(this.touchEnded$, this.monthGraphicScrollEvents$, this.yearGraphicScrollEvents$)
      .pipe(
        filter(() => this.touchEnded$.getValue()),
        debounceTime(20)
      )
      .subscribe(() => {
        // scroll must always stop in the middle child to allow scroll prev and next month
        let childrenWidth = this.monthScrollerEl.children[0].clientWidth;
        this.monthScrollerEl.scrollLeft = childrenWidth + GAP_SIZE;
        this.yearScrollerEl.scrollLeft = childrenWidth + GAP_SIZE;
      });
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

    this.previousYearRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear - 1);
    this.yearRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear);
    this.nextYearRainData = this.rainDataService.getRainDataForMonthsInYear(this.selectedYear + 1);
  }

  private updateHeightsOfGraphicWrappers() {
    setTimeout(() => {
      // wait change detector to update the view and pick the right heights
      this.monthScrollerEl.style.height = `${this.monthScrollerEl.children[1].clientHeight}px`;
      this.yearScrollerEl.style.height = `${this.yearScrollerEl.children[1].clientHeight}px`;
    }, 0);
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
    this.updateHeightsOfGraphicWrappers();
  }

  public showNextYear() {
    this.selectedYear++;
    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
  }

  public isDataAvailableForYear(monthsArray: RainData[]) {
    return monthsArray.some((m) => !m.isFake);
  }

  public selectMonthOfSelectedYear(month: number) {
    this.selectedMonth = month;
    this.updateArraysRainData();
    this.updateHeightsOfGraphicWrappers();
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
}
