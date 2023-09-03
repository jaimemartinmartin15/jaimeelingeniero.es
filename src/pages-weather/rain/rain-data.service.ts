import { Injectable } from '@angular/core';
import { getNumberOfDaysInMonth } from 'src/utils/dates';
import { DATE_PLACEHOLDER, DATE_SEPARATOR, DEFAULT_BULLET_COLOR } from './constants';
import { FileLine } from './file-line';
import { RainData } from './rain-data';
import { compareDates } from './utils';

@Injectable()
export class RainDataService {
  // lines of type dd/mm/yyyy ; liters ; bullet color ; pop up message
  private rainDataPerDay: RainData[] = [];

  // lines of type xx/mm/yyyy ; liters ; bullet color ; pop up message
  // or derived from rainDataPerDay
  private rainDataPerMonth: RainData[] = [];

  // lines of type xx/xx/yyyy ; liters ; bullet color ; pop up message
  // or derived from rainDataPerMonth
  private rainDataPerYear: RainData[] = [];

  public setData(lines: FileLine[]): void {
    this.parseFileLines(lines);

    this.calculateDerivedMonthsFromDays();
    this.calculateDerivedYearsFromMonths();

    this.calculateSvgOffsetsForDays();
    this.calculateSvgOffsetsForMonths();
    this.calculateSvgOffsetsForYears();
  }

  private parseFileLines(lines: FileLine[]) {
    const data = lines.map((l) => new RainData(l));
    this.rainDataPerDay = data.filter((d) => !Number.isNaN(d.day) && !Number.isNaN(d.month));
    this.rainDataPerMonth = data.filter((d) => Number.isNaN(d.day) && !Number.isNaN(d.month));
    this.rainDataPerYear = data.filter((d) => Number.isNaN(d.day) && Number.isNaN(d.month));
  }

  private calculateDerivedMonthsFromDays() {
    const SEPARATOR = '-';
    const existingMonthsFromDays = [...new Set(this.rainDataPerDay.map((d) => `${d.month}${SEPARATOR}${d.year}`))].map((l) => ({
      month: +l.split(SEPARATOR)[0],
      year: +l.split(SEPARATOR)[1],
    }));

    existingMonthsFromDays.forEach(({ month, year }) => {
      const existingMonthFromFile = this.rainDataPerMonth.find((m) => m.month === month && m.year === year);
      const litersInMonth = this.rainDataPerDay
        .filter((d) => d.month === month && d.year === year)
        .map((d) => d.liters)
        .reduce((a, b) => a + b, 0);
      if (existingMonthFromFile === undefined) {
        this.rainDataPerMonth.push(
          new RainData({
            date: `${DATE_PLACEHOLDER}${DATE_SEPARATOR}${month + 1}${DATE_SEPARATOR}${year}`,
            liters: `${litersInMonth}`,
            bulletColor: DEFAULT_BULLET_COLOR,
            popUpContent: '',
          })
        );
      } else if (!existingMonthFromFile.hasLiters) {
        existingMonthFromFile.liters = litersInMonth;
      }
    });
  }

  private calculateDerivedYearsFromMonths() {
    const existingYearsFromMonths = [...new Set(this.rainDataPerMonth.map((d) => d.year))];

    existingYearsFromMonths.forEach((year) => {
      const existingYearFromFile = this.rainDataPerYear.find((y) => y.year === year);
      const litersInYear = this.rainDataPerMonth
        .filter((d) => d.year === year)
        .map((d) => d.liters)
        .reduce((a, b) => a + b, 0);

      if (existingYearFromFile === undefined) {
        this.rainDataPerYear.push(
          new RainData({
            date: `${DATE_PLACEHOLDER}${DATE_SEPARATOR}${DATE_PLACEHOLDER}${DATE_SEPARATOR}${year}`,
            liters: `${litersInYear}`,
            bulletColor: DEFAULT_BULLET_COLOR,
            popUpContent: '',
          })
        );
      } else if (!existingYearFromFile.hasLiters) {
        existingYearFromFile.liters = litersInYear;
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
    const years = new Set<number>(this.rainDataPerMonth.map((m) => m.year));
    years.forEach((year) => {
      const monthsOfTheYear = this.rainDataPerMonth.filter((m) => m.year === year);
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
    const requestedDays = this.rainDataPerDay.filter((d) => d.month === month && d.year === year);
    const totalNumberOfDaysInMonth = getNumberOfDaysInMonth(month, year);

    // add missing days of the month if there is at least one day for the month
    if (requestedDays.length > 0 && requestedDays.length < totalNumberOfDaysInMonth) {
      for (let day = 1; day <= totalNumberOfDaysInMonth; day++) {
        if (requestedDays.find((d) => d.day === day) === undefined) {
          const mockData = new RainData({
            date: `${day}${DATE_SEPARATOR}${month + 1}${DATE_SEPARATOR}${year}`,
            liters: '',
            bulletColor: DEFAULT_BULLET_COLOR,
            popUpContent: '',
          });
          mockData.svgOffset = 363;
          requestedDays.push(mockData);
        }
      }
    }

    return requestedDays.sort(compareDates);
  }

  public getRainDataPerMonths(year: number): RainData[] {
    const requestedMonths = this.rainDataPerMonth.filter((m) => m.year === year);

    // add missing months if there is at least one month for the year
    if (requestedMonths.length > 0 && requestedMonths.length < 12) {
      for (let month = 0; month < 12; month++) {
        if (requestedMonths.find((m) => m.month === month) === undefined) {
          const mockData = new RainData({
            date: `${DATE_PLACEHOLDER}${DATE_SEPARATOR}${month + 1}${DATE_SEPARATOR}${year}`,
            liters: '',
            bulletColor: DEFAULT_BULLET_COLOR,
            popUpContent: '',
          });
          mockData.svgOffset = 258;
          requestedMonths.push(mockData);
        }
      }
    }

    return requestedMonths.sort(compareDates);
  }

  public getRainDataPerYear(): RainData[] {
    const minYear = Math.min(...this.rainDataPerYear.map((m) => m.year));
    const maxYear = Math.max(...this.rainDataPerYear.map((m) => m.year));

    const requestedYears = [...this.rainDataPerYear];

    // add missing years between minYear and MaxYear
    for (let year = minYear; year <= maxYear; year++) {
      if (requestedYears.find((y) => y.year === year) === undefined) {
        const mockData = new RainData({
          date: `${DATE_PLACEHOLDER}${DATE_SEPARATOR}${DATE_PLACEHOLDER}${DATE_SEPARATOR}${year}`,
          liters: '',
          bulletColor: DEFAULT_BULLET_COLOR,
          popUpContent: '',
        });
        mockData.svgOffset = 258;
        requestedYears.push(mockData);
      }
    }

    return requestedYears.sort(compareDates);
  }
}
