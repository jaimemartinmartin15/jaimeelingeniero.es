import { Injectable } from '@angular/core';
import { LineData, LineType } from './line-data';
import { RainData } from './rain-data';

@Injectable()
export class RainDataService {
  // lines of type dd/mm/yyyy-liters
  private allDaysRainData: RainData[] = [];

  // lines of type xx/mm/yyyy-liters
  private allMonthsRainData: RainData[] = [];

  private _comparationYearData: RainData[] = [];

  public setData(data: LineData[]): void {
    data.forEach((line) => {
      switch (line.lineType) {
        case LineType.DAY:
          this.allDaysRainData.push({
            date: new Date(line.year, line.month, line.day),
            liters: line.liters,
            popUpContent: line.popUpContent,
            svgOffset: 0,
            isFake: false,
          });
          break;
        case LineType.MONTH:
          this.allMonthsRainData.push({
            date: new Date(line.year, line.month, 1),
            liters: line.liters,
            popUpContent: line.popUpContent,
            svgOffset: 0,
            isFake: false,
          });
          break;
      }
    });

    // add new month for those months which rain is calculated adding their days
    const separator = '/';
    const missingMonths: Map<string, number> = new Map();
    this.allDaysRainData.forEach((d) => {
      const keyDate = `${d.date.getMonth()}${separator}${d.date.getFullYear()}`;
      missingMonths.set(keyDate, (missingMonths.get(keyDate) ?? 0) + d.liters);
    });
    missingMonths.forEach((value, key) => {
      const month = +key.split(separator)[0];
      const year = +key.split(separator)[1];
      if (this.allMonthsRainData.find((m) => m.date.getMonth() === month && m.date.getFullYear() === year) == undefined) {
        this.allMonthsRainData.push({ date: new Date(year, month, 1), liters: value, svgOffset: 0, isFake: false });
      }
    });

    this.calculateSvgOffsetsForAllDays();
    this.calculateSvgOffsetsForAllMonths();
  }

  private calculateSvgOffsetsForAllDays() {
    this.allDaysRainData.forEach((day) => {
      // 360 is svg viewBox height for the pluviometer
      // then, pluviometer: offset 0 -> full water (35 L)    offset 360 -> empty water (0 L)
      // start from offset 185 to not fill full pluviometer (difference 178)   offset 185 -> 35 L     offset 363 -> 0 L  (363 avoids shadow)
      // if it rains more than 70 liters do not take it into account (would be negative offset)
      day.svgOffset = 363 - 178 * (Math.min(day.liters, 70) / 35);
    });
  }

  private calculateSvgOffsetsForAllMonths() {
    // pick months year by year and calculate the offset of each month
    const years = new Set<number>(this.allMonthsRainData.map((m) => m.date.getFullYear()));
    years.forEach((year) => {
      const monthsOfTheYear = this.allMonthsRainData.filter((m) => m.date.getFullYear() === year);
      const maxLiters = Math.max(...monthsOfTheYear.map((m) => m.liters));
      // 0 L -> 258 (svg x axis height aprox)    MAX L -> 0
      monthsOfTheYear.forEach((m) => (m.svgOffset = 258 - 258 * (m.liters / maxLiters)));
    });
  }

  public getRainDataForDaysInMonthAndYear(month: number, year: number): RainData[] {
    // by using 0 as the day it will give us the last day of the prior month
    const totalNumberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const requestedDays = this.allDaysRainData.filter((d) => d.date.getMonth() === month && d.date.getFullYear() === year);
    if (year <= today.getFullYear() && month <= today.getMonth() && requestedDays.length > 0 && requestedDays.length < totalNumberOfDaysInMonth) {
      // if it is requesting days for a month in the past (current included too)
      // and there are missing days (maybe started to log on day 17) then add fake missing days
      for (let day = 1; day <= totalNumberOfDaysInMonth; day++) {
        if (requestedDays.find((d) => d.date.getDate() === day) === undefined) {
          requestedDays.push({ date: new Date(year, month, day), liters: 0, svgOffset: 363, isFake: true });
        }
      }
    }

    return requestedDays.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  public getRainDataForMonthsInYear(year: number): RainData[] {
    const requestedMonths = this.allMonthsRainData.filter((m) => m.date.getFullYear() === year);
    if (requestedMonths.length < 12) {
      // if there are missing data for any month in the requested year, add fake missing months
      for (let month = 0; month < 12; month++) {
        if (requestedMonths.find((m) => m.date.getMonth() === month) === undefined) {
          requestedMonths.push({ date: new Date(year, month, 1), liters: 0, svgOffset: 258, isFake: true });
        }
      }
    }

    return requestedMonths.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  public getComparationYearRainData(): RainData[] {
    if (this._comparationYearData.length !== 0) {
      return this._comparationYearData;
    }

    const minYear = Math.min(...this.allMonthsRainData.map((m) => m.date.getFullYear()));
    const maxYear = Math.max(...this.allMonthsRainData.map((m) => m.date.getFullYear()));
    for (let year = minYear; year <= maxYear; year++) {
      const totalAmountOfLitersInYear = this.allMonthsRainData
        .filter((m) => m.date.getFullYear() === year)
        .map((m) => m.liters)
        .reduce((a, b) => a + b, 0);
      this._comparationYearData.push({
        date: new Date(year, 0, 1),
        liters: totalAmountOfLitersInYear,
        isFake: !this.allMonthsRainData.some((h) => h.date.getFullYear() === year),
        svgOffset: 0,
      });
    }
    this.calculateSvgOffsetsForComparationYearData();
    return this._comparationYearData;
  }

  public calculateSvgOffsetsForComparationYearData() {
    const maxRain = Math.max(...this._comparationYearData.map((h) => h.liters));
    this._comparationYearData.forEach((h) => {
      // min rain -> offset 258    max rain -> offset 0
      h.svgOffset = 258 - (258 * h.liters) / maxRain;
    });
  }
}
