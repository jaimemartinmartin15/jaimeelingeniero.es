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
  @ViewChild('daysGraphicScroller', { static: false }) private daysGraphicScrollerRef: ElementRef;
  @ViewChild('monthsGraphicScroller', { static: false }) private monthsGraphicScrollerRef: ElementRef;
  @ViewChild('yearsGraphicSvgWrapper', { static: false }) private yearsGraphicSvgWrapperRef: ElementRef;

  private get daysScrollerEl(): HTMLDivElement {
    return this.daysGraphicScrollerRef.nativeElement;
  }

  private get monthsScrollerEl(): HTMLDivElement {
    return this.monthsGraphicScrollerRef.nativeElement;
  }

  public yearsGraphicSvgWidth: number = 0;

  // handling of custom snap-scroll
  private touchEnded$ = new BehaviorSubject<boolean>(true);
  public daysGraphicScrollEvents$ = new Subject<void>();
  public monthsGraphicScrollEvents$ = new Subject<void>();

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

  public constructor(public readonly rainDataService: RainDataService, private readonly activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.rainDataService.setData(this.activatedRoute.snapshot.data['rainData']);
    this.updateArraysRainData();

    this.handleScrollSnapEvents();
    this.handleMonthGraphicScroll();
    this.handleYearGraphicScroll();
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

  @HostListener('touchstart')
  public onTouchStart() {
    this.touchEnded$.next(false);
  }

  @HostListener('touchend')
  public onTouchEnd() {
    this.touchEnded$.next(true);
  }

  private centerScrollingInstantly() {
    this.daysScrollerEl.scrollTo({
      top: 0,
      left: this.daysScrollerEl.clientWidth + GAP_SIZE,
      behavior: 'instant' as ScrollBehavior,
    });
    this.monthsScrollerEl.scrollTo({
      top: 0,
      left: this.monthsScrollerEl.clientWidth + GAP_SIZE,
      behavior: 'instant' as ScrollBehavior,
    });
  }

  private handleScrollSnapEvents() {
    merge(this.touchEnded$, this.daysGraphicScrollEvents$, this.monthsGraphicScrollEvents$)
      .pipe(
        filter(() => this.touchEnded$.getValue()),
        debounceTime(20)
      )
      .subscribe(() => {
        // assume both graphs have same width
        let childrenWidth = this.daysScrollerEl.children[0].clientWidth;

        // update scroll on month graph
        let scrollLeft = this.daysScrollerEl.scrollLeft;
        if (scrollLeft > 0 && scrollLeft < (childrenWidth + GAP_SIZE) / 2) {
          this.daysScrollerEl.scrollLeft = 0;
        } else if (scrollLeft > (childrenWidth + GAP_SIZE) / 2 && scrollLeft < childrenWidth + GAP_SIZE + (childrenWidth + GAP_SIZE) / 2) {
          this.daysScrollerEl.scrollLeft = childrenWidth + GAP_SIZE;
        } else {
          this.daysScrollerEl.scrollLeft = (childrenWidth + GAP_SIZE) * 2;
        }

        // update scroll on year graph
        scrollLeft = this.monthsScrollerEl.scrollLeft;
        if (scrollLeft > 0 && scrollLeft < (childrenWidth + GAP_SIZE) / 2) {
          this.monthsScrollerEl.scrollLeft = 0;
        } else if (scrollLeft > (childrenWidth + GAP_SIZE) / 2 && scrollLeft < childrenWidth + GAP_SIZE + (childrenWidth + GAP_SIZE) / 2) {
          this.monthsScrollerEl.scrollLeft = childrenWidth + GAP_SIZE;
        } else {
          this.monthsScrollerEl.scrollLeft = (childrenWidth + GAP_SIZE) * 2;
        }
      });
  }

  public handleMonthGraphicScroll() {
    this.daysGraphicScrollEvents$.subscribe(() => {
      const childrenWidth = this.daysScrollerEl.children[0].clientWidth;

      // check if the scroll is multiple of a child width taking into account the gap
      if (this.daysScrollerEl.scrollLeft % (childrenWidth + GAP_SIZE) === 0) {
        if (this.daysScrollerEl.scrollLeft === 0) {
          this.showPreviousMonth();
        } else if (this.daysScrollerEl.scrollLeft === (childrenWidth + GAP_SIZE) * 2) {
          this.showNextMonth();
        }

        this.centerScrollingInstantly();
      }
    });
  }

  public handleYearGraphicScroll() {
    this.monthsGraphicScrollEvents$.subscribe(() => {
      const childrenWidth = this.monthsScrollerEl.children[0].clientWidth;

      // check if the scroll is multiple of a child width taking into account the gap
      if (this.monthsScrollerEl.scrollLeft % (childrenWidth + GAP_SIZE) === 0) {
        if (this.monthsScrollerEl.scrollLeft === 0) {
          this.showPreviousYear();
        } else if (this.monthsScrollerEl.scrollLeft === (childrenWidth + GAP_SIZE) * 2) {
          this.showNextYear();
        }

        this.centerScrollingInstantly();
      }
    });
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

    // it is cached in the service
    this.yearsGraphicRainData = this.rainDataService.getRainDataPerYear();
  }

  private updateHeightsOfGraphicWrappers() {
    setTimeout(() => {
      // wait change detector to update the view and pick the right heights
      this.daysScrollerEl.style.height = `${this.daysScrollerEl.children[1].clientHeight}px`;
      this.monthsScrollerEl.style.height = `${this.monthsScrollerEl.children[1].clientHeight}px`;
    }, 0);
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
