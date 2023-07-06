import { Injectable } from '@angular/core';
import { RainData } from './rain-data';

@Injectable()
export class RainDataService {
  // lines of type dd/mm/yyyy-liters
  private allDaysRainData: RainData[] = [];

  // lines of type xx/mm/yyyy-liters
  private allMonthsRainData: RainData[] = [];

  public setData(data: string[]): void {
    data.forEach((line) => {
      const splitLine = line.split(/\/|-/); // divide day/month/year-liters

      if (!line.startsWith('xx')) {
        // it is rain for a specific day
        this.allDaysRainData.push({
          date: new Date(+splitLine[2], +splitLine[1] - 1, +splitLine[0]),
          liters: +splitLine[3],
          svgOffset: 0,
          isFake: false,
        });
        return;
      }

      // it is rain for the full month (no data available for each day)
      this.allMonthsRainData.push({ date: new Date(+splitLine[2], +splitLine[1] - 1, 1), liters: +splitLine[3], svgOffset: 0, isFake: false });
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
    return this.allDaysRainData.filter((d) => d.date.getMonth() === month && d.date.getFullYear() === year);
  }

  public getRainDataForMonthsInYear(year: number): RainData[] {
    return this.allMonthsRainData.filter((m) => m.date.getFullYear() === year);
  }
}
