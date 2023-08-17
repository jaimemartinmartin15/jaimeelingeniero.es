import { Injectable } from '@angular/core';
import { getNumberOfDaysInMonth } from 'src/utils/dates';
import { LineFile, LineType } from './line-file';
import { RainData } from './rain-data';

@Injectable()
export class RainDataService {
  // lines of type dd/mm/yyyy-liters[optional pop up content]
  private rainDataPerDay: RainData[] = [];

  // lines of type xx/mm/yyyy-liters[optional pop up content]
  // or derived from rainDataPerDay
  private rainDataPerMonth: RainData[] = [];

  // lines of type xx/xx/yyyy-liters[optional pop up content]
  // or derived from rainDataPerMonth
  private rainDataPerYear: RainData[] = [];

  public setData(lines: LineFile[]): void {
    this.splitLinesByType(lines);

    this.calculateDerivedMonthsFromDays();
    this.calculateDerivedYearsFromMonths();

    this.calculateSvgOffsetsForDays();
    this.calculateSvgOffsetsForMonths();
    this.calculateSvgOffsetsForYears();
  }

  private splitLinesByType(lines: LineFile[]) {
    lines.forEach((l) => {
      switch (l.lineType) {
        case LineType.DAY:
          this.rainDataPerDay.push({
            date: new Date(l.year, l.month, l.day),
            liters: l.liters,
            popUpContent: l.popUpContent,
            svgOffset: 0,
            isFake: false,
          });
          break;
        case LineType.MONTH:
          this.rainDataPerMonth.push({
            date: new Date(l.year, l.month, 1),
            liters: l.liters,
            popUpContent: l.popUpContent,
            svgOffset: 0,
            isFake: false,
          });
          break;
        case LineType.YEAR:
          this.rainDataPerYear.push({
            date: new Date(l.year, 0, 1),
            liters: l.liters,
            popUpContent: l.popUpContent,
            svgOffset: 0,
            isFake: false,
          });
          break;
      }
    });
  }

  private calculateDerivedMonthsFromDays() {
    const SEPARATOR = '-';
    const existingMonthsFromDays = [...new Set(this.rainDataPerDay.map((d) => `${d.date.getMonth()}${SEPARATOR}${d.date.getFullYear()}`))].map(
      (l) => ({
        month: +l.split(SEPARATOR)[0],
        year: +l.split(SEPARATOR)[1],
      })
    );

    existingMonthsFromDays.forEach(({ month, year }) => {
      if (this.rainDataPerMonth.find((m) => m.date.getMonth() === month && m.date.getFullYear() === year) === undefined) {
        this.rainDataPerMonth.push({
          date: new Date(year, month, 1),
          liters: this.rainDataPerDay
            .filter((d) => d.date.getMonth() === month && d.date.getFullYear() === year)
            .map((d) => d.liters)
            .reduce((a, b) => a + b, 0),
          svgOffset: 0,
          isFake: false,
        });
      }
    });
  }

  private calculateDerivedYearsFromMonths() {
    const existingYearsFromMonths = [...new Set(this.rainDataPerMonth.map((d) => d.date.getFullYear()))];

    existingYearsFromMonths.forEach((year) => {
      if (this.rainDataPerYear.find((y) => y.date.getFullYear() === year) === undefined) {
        this.rainDataPerYear.push({
          date: new Date(year, 0, 1),
          liters: this.rainDataPerMonth
            .filter((d) => d.date.getFullYear() === year)
            .map((d) => d.liters)
            .reduce((a, b) => a + b, 0),
          svgOffset: 0,
          isFake: false,
        });
      }
    });
  }

  private calculateSvgOffsetsForDays() {
    this.rainDataPerDay.forEach((day) => {
      // 360 is svg viewBox height for the pluviometer
      // then, pluviometer: offset 0 -> full water (35 L)    offset 360 -> empty water (0 L)
      // start from offset 185 to not fill full pluviometer (difference 178)   offset 185 -> 35 L     offset 363 -> 0 L  (363 avoids shadow)
      // if it rains more than 70 liters do not take it into account (would be negative offset)
      day.svgOffset = 363 - 178 * (Math.min(day.liters, 70) / 35);
    });
  }

  private calculateSvgOffsetsForMonths() {
    // pick months year by year and calculate the offset of each month
    const years = new Set<number>(this.rainDataPerMonth.map((m) => m.date.getFullYear()));
    years.forEach((year) => {
      const monthsOfTheYear = this.rainDataPerMonth.filter((m) => m.date.getFullYear() === year);
      const maxLiters = Math.max(...monthsOfTheYear.map((m) => m.liters));
      // 0 L -> 258 (svg x axis height aprox)    MAX L -> 0
      monthsOfTheYear.forEach((m) => (m.svgOffset = 258 - 258 * (m.liters / maxLiters)));
    });
  }

  public calculateSvgOffsetsForYears() {
    const maxRain = Math.max(...this.rainDataPerYear.map((h) => h.liters));
    this.rainDataPerYear.forEach((h) => {
      // min rain -> offset 258    max rain -> offset 0
      h.svgOffset = 258 - (258 * h.liters) / maxRain;
    });
  }

  public getRainDataPerDays(month: number, year: number): RainData[] {
    const requestedDays = this.rainDataPerDay.filter((d) => d.date.getMonth() === month && d.date.getFullYear() === year);
    const totalNumberOfDaysInMonth = getNumberOfDaysInMonth(month, year);

    // add missing days of the month if there is at least one day for the month
    if (requestedDays.length > 0 && requestedDays.length < totalNumberOfDaysInMonth) {
      for (let day = 1; day <= totalNumberOfDaysInMonth; day++) {
        if (requestedDays.find((d) => d.date.getDate() === day) === undefined) {
          requestedDays.push({ date: new Date(year, month, day), liters: 0, svgOffset: 363, isFake: true });
        }
      }
    }

    return requestedDays.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  public getRainDataPerMonths(year: number): RainData[] {
    const requestedMonths = this.rainDataPerMonth.filter((m) => m.date.getFullYear() === year);

    // add missing months if there is at least one month for the year
    if (requestedMonths.length > 0 && requestedMonths.length < 12) {
      for (let month = 0; month < 12; month++) {
        if (requestedMonths.find((m) => m.date.getMonth() === month) === undefined) {
          requestedMonths.push({ date: new Date(year, month, 1), liters: 0, svgOffset: 258, isFake: true });
        }
      }
    }

    return requestedMonths.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  public getRainDataPerYear(): RainData[] {
    const minYear = Math.min(...this.rainDataPerYear.map((m) => m.date.getFullYear()));
    const maxYear = Math.max(...this.rainDataPerYear.map((m) => m.date.getFullYear()));

    const requestedYears = [...this.rainDataPerYear];

    // add missing years between minYear and MaxYear
    for (let year = minYear; year <= maxYear; year++) {
      if (requestedYears.find((y) => y.date.getFullYear() === year) === undefined) {
        requestedYears.push({ date: new Date(year, 0, 1), liters: 0, svgOffset: 258, isFake: true });
      }
    }

    return requestedYears.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
