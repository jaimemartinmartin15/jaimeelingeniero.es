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
  public monthDays: { percentage: number; liters: number }[] = [];
  public historical: { date: Date; percentage: number; liters: number }[] = [];

  public constructor(private readonly http: HttpClient) {}

  public ngOnInit() {
    this.http.get('assets/pages-weather/rain/rain-data.txt', { responseType: 'text' }).subscribe((response) => {
      this.historical = response.split('\n').map((line) => {
        const date = line.split(/\/|-|\r/); // \r is the new line, so the liters do not contain it
        const percentage = (+date[3] * 0.8) / 35; // pluviometer makes 35 liters but it only fills 80% in the animation
        return { date: new Date(+date[2], +date[1], +date[0]), percentage, liters: +date[3] };
      });

      this.setMonthDays(this.currentYear, this.currentMonthIndex);
    });
  }

  public setMonthDays(year: number, month: number) {
    this.monthDays = this.historical.filter((d) => d.date.getFullYear() === year && d.date.getMonth() === month);
  }

  public get weekDayIndexMonthStarts(): number {
    return new Date(this.currentYear, this.currentMonthIndex, 1).getDay();
  }
}
