import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
})
export class RainComponent implements OnInit {
  public currentYear = new Date().getFullYear();
  public currentMonthIndex = new Date().getMonth();

  // TODO remove this mock
  public monthDaysLiters: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  public constructor(private readonly http: HttpClient) {}

  public ngOnInit() {
    this.http.get('assets/pages-weather/rain/rain-data.txt', { responseType: 'text' }).subscribe((response) => {
      // TODO parse data
      console.log(response);
    });
  }

  public get weekDayIndexMonthStarts(): number {
    return new Date(this.currentYear, this.currentMonthIndex, 1).getDay();
  }
}
