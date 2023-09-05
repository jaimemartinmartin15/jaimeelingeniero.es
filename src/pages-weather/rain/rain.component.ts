import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FileLine } from './file-line';
import { RainDataService } from './rain-data.service';
import { SnapScrollHelper } from './snap-scroll-helper';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
  providers: [RainDataService],
})
export class RainComponent extends SnapScrollHelper implements OnInit, AfterViewInit {
  public readonly popUp = { show: false, content: '' };

  public isDataFileLoading: boolean = false;

  public selectedYear = new Date().getFullYear();
  public selectedMonth = new Date().getMonth();

  public constructor(public readonly rainDataService: RainDataService) {
    super();
  }

  public ngOnInit() {
    this.handleScrollSnapEvents();
    this.handleDaysGraphicScroll();
    this.handleMonthsGraphicScroll();
  }

  public ngAfterViewInit() {
    this.centerScrollingInstantly();
  }

  public onLoadDataFile(fileLines: FileLine[]) {
    this.rainDataService.setData(fileLines);

    // select current month and year
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth();

    this.updateHeightsOfGraphicWrappers();
  }

  public showPreviousMonth() {
    this.selectedMonth--;
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11; // set December last year
      this.selectedYear--;
    }

    this.updateHeightsOfGraphicWrappers();
  }

  public showNextMonth() {
    this.selectedMonth++;
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0; // set January next year
      this.selectedYear++;
    }

    this.updateHeightsOfGraphicWrappers();
  }

  public showPreviousYear() {
    this.selectedYear--;
    this.updateHeightsOfGraphicWrappers();
  }

  public showNextYear() {
    this.selectedYear++;
    this.updateHeightsOfGraphicWrappers();
  }

  public selectMonthOfSelectedYear(month: number) {
    this.selectedMonth = month;
    this.updateHeightsOfGraphicWrappers();
  }

  public selectYear(year: number) {
    this.selectedYear = year;
    this.updateHeightsOfGraphicWrappers();
  }
}
