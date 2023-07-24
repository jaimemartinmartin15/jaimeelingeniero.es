import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';

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
    const childWith = this.items.get(0)?.nativeElement.offsetWidth;
    // 20 is .content gap in scss file
    this.scroller.nativeElement.style.width = `${(childWith + 20) * this.showElementsAtSameTime}px`;
  }

  public scrollPrev() {
    const childWith = this.items.get(0)?.nativeElement.offsetWidth;
    this.scroller.nativeElement.scrollLeft -= childWith;
  }

  public scrollNext() {
    const childWith = this.items.get(0)?.nativeElement.offsetWidth;
    this.scroller.nativeElement.scrollLeft += childWith;
  }
}
