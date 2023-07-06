import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MONTHS } from 'src/utils/dates';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
})
export class RainComponent implements OnInit {
  public readonly MONTHS = MONTHS;
  public currentYear = new Date().getFullYear();
  public currentMonthIndex = new Date().getMonth();
  public monthDays: { svgOffset: number; liters: number }[] = [];
  public waterYearLines: number[] = [];
  public historical: { date: Date; svgOffset: number; liters: number }[] = [];

  public constructor(private readonly http: HttpClient) {}

  public ngOnInit() {
    this.http.get('assets/pages-weather/rain/rain-data.txt', { responseType: 'text' }).subscribe((response) => {
      this.historical = response
        .split('\n')
        .filter((l) => !l.trim().startsWith('//') && l.trim() !== '')
        .map((line) => {
          const date = line.split(/\/|-|\r/); // \r is the new line, so the liters do not contain it
          // svgOffset: 360 is svg viewBox height (363 avoids shadow). Pluviometer: offset 0 -> full water (35 L)    offset 360 -> empty water (0 L)
          // start from offset 185 to not fill full pluviometer  (difference 178)   offset 185 -> 35 L     offset 363 -> 0 L
          // if it rains more than 70 do not take it into account (negative offset)
          const svgOffset = 363 - 178 * (Math.min(+date[3], 70) / 35);
          return { date: new Date(+date[2], +date[1] - 1, +date[0]), svgOffset, liters: +date[3] };
        });

      this.setMonthDays(this.currentYear, this.currentMonthIndex);
      this.calculateWaterYearLines(this.currentYear);
    });
  }

  public setMonthDays(year: number, month: number) {
    this.currentYear = year;
    this.currentMonthIndex = month;
    this.monthDays = this.historical.filter((d) => d.date.getFullYear() === year && d.date.getMonth() === month);
  }

  public calculateWaterYearLines(year: number) {
    const monthLiters: { [key: string]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 };
    this.historical
      .filter((d) => d.date.getFullYear() === year)
      .forEach((h) => {
        monthLiters[h.date.getMonth()] += h.liters;
      });
    const maxLiters = Math.max(...Object.values(monthLiters));
    // 0 L -> 258 (svg x axis height aprox)    MAX L -> 0
    this.waterYearLines = Object.values(monthLiters).map((l) => 258 - 258 * (l / maxLiters));
  }

  public get totalAmountOfLitersInCurrentMonth(): number {
    return this.monthDays.map((d) => d.liters).reduce((a, b) => a + b, 0);
  }

  public get weatherIcon(): string {
    if (this.currentMonthIndex < 3) return '❄️';
    if (this.currentMonthIndex < 6) return '🌹';
    if (this.currentMonthIndex < 9) return '☀️';
    return '🍁';
  }

  public showPreviousMonth() {
    this.currentMonthIndex--;
    if (this.currentMonthIndex < 0) {
      this.currentMonthIndex = 11; // set December last year
      this.currentYear--;
      this.calculateWaterYearLines(this.currentYear);
    }

    this.setMonthDays(this.currentYear, this.currentMonthIndex);
  }

  public showNextMonth() {
    this.currentMonthIndex++;
    if (this.currentMonthIndex > 11) {
      this.currentMonthIndex = 0; // set January next year
      this.currentYear++;
      this.calculateWaterYearLines(this.currentYear);
    }

    this.setMonthDays(this.currentYear, this.currentMonthIndex);
  }

  public get weekDayIndexMonthStarts(): number {
    return new Date(this.currentYear, this.currentMonthIndex, 1).getDay();
  }

  public get totalAmountOfLitersInCurrentYear(): number {
    return this.historical
      .filter((d) => d.date.getFullYear() === this.currentYear)
      .map((h) => h.liters)
      .reduce((a, b) => a + b, 0);
  }

  public showPreviousYear() {
    this.currentYear--;
    this.calculateWaterYearLines(this.currentYear);
    this.setMonthDays(this.currentYear, this.currentMonthIndex);
  }

  public showNextYear() {
    this.currentYear++;
    this.calculateWaterYearLines(this.currentYear);
    this.setMonthDays(this.currentYear, this.currentMonthIndex);
  }

  public isDataAvailableForYear(year: number) {
    return this.historical.find((h) => h.date.getFullYear() === year) != undefined;
  }
}
