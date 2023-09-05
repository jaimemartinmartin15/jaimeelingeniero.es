import { Directive, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime, filter, merge } from 'rxjs';

const GAP_SIZE = 30; // 30 px as in scss file in .graphic-scroller class

@Directive()
export abstract class SnapScrollHelper {
  public abstract showPreviousMonth(): void;
  public abstract showNextMonth(): void;
  public abstract showPreviousYear(): void;
  public abstract showNextYear(): void;

  @ViewChild('daysGraphicScroller', { static: false }) protected daysGraphicScrollerRef: ElementRef;
  @ViewChild('monthsGraphicScroller', { static: false }) protected monthsGraphicScrollerRef: ElementRef;

  protected get daysScrollerEl(): HTMLDivElement {
    return this.daysGraphicScrollerRef.nativeElement;
  }

  protected get monthsScrollerEl(): HTMLDivElement {
    return this.monthsGraphicScrollerRef.nativeElement;
  }

  // handling of custom snap-scroll
  protected touchEnded$ = new BehaviorSubject<boolean>(true);
  public daysGraphicScrollEvents$ = new Subject<void>();
  public monthsGraphicScrollEvents$ = new Subject<void>();

  @HostListener('touchstart')
  public onTouchStart() {
    this.touchEnded$.next(false);
  }

  @HostListener('touchend')
  public onTouchEnd() {
    this.touchEnded$.next(true);
  }

  protected centerScrollingInstantly() {
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

  protected handleScrollSnapEvents() {
    merge(this.touchEnded$, this.daysGraphicScrollEvents$, this.monthsGraphicScrollEvents$)
      .pipe(
        filter(() => this.touchEnded$.getValue()),
        debounceTime(20)
      )
      .subscribe(() => {
        // assume both graphs have same width
        let childrenWidth = this.daysScrollerEl.children[0].clientWidth;

        // update scroll on days-graphic
        let scrollLeft = this.daysScrollerEl.scrollLeft;
        if (scrollLeft > 0 && scrollLeft < (childrenWidth + GAP_SIZE) / 2) {
          this.daysScrollerEl.scrollLeft = 0;
        } else if (scrollLeft > (childrenWidth + GAP_SIZE) / 2 && scrollLeft < childrenWidth + GAP_SIZE + (childrenWidth + GAP_SIZE) / 2) {
          this.daysScrollerEl.scrollLeft = childrenWidth + GAP_SIZE;
        } else {
          this.daysScrollerEl.scrollLeft = (childrenWidth + GAP_SIZE) * 2;
        }

        // update scroll on months-graphic
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

  protected handleDaysGraphicScroll() {
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

  protected handleMonthsGraphicScroll() {
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

  protected updateHeightsOfGraphicWrappers() {
    setTimeout(() => {
      // wait change detector to update the view and pick the right heights
      this.daysScrollerEl.style.height = `${this.daysScrollerEl.children[1].clientHeight}px`;
      this.monthsScrollerEl.style.height = `${this.monthsScrollerEl.children[1].clientHeight}px`;
    }, 0);
  }
}
