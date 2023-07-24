import { AfterViewInit, Component, ContentChildren, ElementRef, HostListener, Input, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('scroller')
  public scroller: ElementRef;

  @ContentChildren('carouselItem')
  public items: QueryList<ElementRef>;

  @Input()
  public showElementsAtSameTime: number = 1;

  public ngAfterViewInit(): void {
    this.items.forEach((e) => (e.nativeElement.style.scrollSnapAlign = 'start'));
    this.setCarouselContentWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCarouselContentWidth();
  }

  private setCarouselContentWidth() {
    const childWidth = this.items.get(0)?.nativeElement.offsetWidth;
    const gapSize = 20; // .content gap in scss file
    const itemsToShow = Math.min(
      this.showElementsAtSameTime,
      Math.max(Math.floor((document.documentElement.clientWidth - 200) / (childWidth + gapSize)), 1)
    );
    this.scroller.nativeElement.style.width = `${(childWidth + gapSize) * itemsToShow}px`;
  }

  public scrollPrev() {
    const childWidth = this.items.get(0)?.nativeElement.offsetWidth;
    this.scroller.nativeElement.scrollLeft -= childWidth;
  }

  public scrollNext() {
    const childWidth = this.items.get(0)?.nativeElement.offsetWidth;
    this.scroller.nativeElement.scrollLeft += childWidth;
  }
}
