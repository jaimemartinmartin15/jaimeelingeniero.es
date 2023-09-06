import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { RainData } from '../../rain-data';
import { RainDataService } from '../../rain-data.service';

@Component({
  selector: 'app-years-graphic',
  templateUrl: './years-graphic.component.html',
  styleUrls: ['./years-graphic.component.scss'],
})
export class YearsGraphicComponent implements OnChanges {
  @ViewChild('yearsGraphicSvgWrapper', { static: false })
  protected yearsGraphicSvgWrapperRef: ElementRef;

  @Input()
  public selectedYear: number;

  @Input()
  public loading: boolean;

  @Input()
  public error: boolean;

  @Output()
  public showYear: EventEmitter<number> = new EventEmitter();

  public yearsGraphicSvgWidth: number = 0;

  public rainPerYears: RainData[] = [];

  public constructor(private readonly rainDataService: RainDataService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.rainPerYears = this.rainDataService.getRainDataPerYear();

    if (changes['loading']?.previousValue === true && changes['loading'].currentValue === false && !this.error) {
      // wait until data is loaded and then wait to adapt the view to calculate the svg width correctly
      setTimeout(() => {
        const boxWidth = this.yearsGraphicSvgWrapperRef.nativeElement.offsetWidth;
        const boxHeight = this.yearsGraphicSvgWrapperRef.nativeElement.offsetHeight;
        const relation = boxHeight / 325; // 325 is viewBox in html file
        this.yearsGraphicSvgWidth =
          25 + this.rainPerYears.length * 30 < boxWidth / relation ? boxWidth / relation : 25 + this.rainPerYears.length * 30;
      });
    }
  }
}
