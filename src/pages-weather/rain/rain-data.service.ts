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
      const splitLine = line.split(/\/|-|\r/); // \r is the new line, so the last part does not contain it

      if (line.trim().startsWith('xx')) {
        // it is rain for the full month (no data available for each day)
        this.allMonthsRainData.push({ date: new Date(+splitLine[2], +splitLine[1] - 1, 1), liters: +splitLine[3], svgOffset: 0 });
        return;
      }

      // it is rain for a specific day
      this.allDaysRainData.push({ date: new Date(+splitLine[2], +splitLine[1] - 1, +splitLine[0]), liters: +splitLine[3], svgOffset: 0 });
    });

    this.calculateSvgOffsetsForAllDays();
    this.calculateSvgOffsetsForAllYears();
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

  private calculateSvgOffsetsForAllYears() {
    // first add new object for those months which rain is calculated adding their days
    let minYear = Math.min(...this.allDaysRainData.map((d) => d.date.getFullYear()));
    let maxYear = Math.max(...this.allDaysRainData.map((d) => d.date.getFullYear()));
    for (let year = minYear; year <= maxYear; year++) {
      const monthLiters: { [key: string]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 };
      // pick days of a year, and calculate for each month the amount of rain
      this.allDaysRainData
        .filter((d) => d.date.getFullYear() === year)
        .forEach((h) => {
          monthLiters[h.date.getMonth()] += h.liters;
        });

      Object.entries(monthLiters)
        // filter months that are already included in allMonthsRainData
        .filter((e) => this.allMonthsRainData.find((m) => m.date.getFullYear() === year && m.date.getMonth() === +e[0]) == undefined)
        .forEach((e) => this.allMonthsRainData.push({ date: new Date(year, +e[0], 1), liters: +e[1], svgOffset: 0 }));
    }

    // pick months year by year and calculate the offset of each month
    minYear = Math.min(...this.allMonthsRainData.map((d) => d.date.getFullYear()));
    maxYear = Math.max(...this.allMonthsRainData.map((d) => d.date.getFullYear()));
    for (let year = minYear; year <= maxYear; year++) {
      const monthsOfTheYear = this.allMonthsRainData.filter((m) => m.date.getFullYear() === year);
      const maxLiters = Math.max(...monthsOfTheYear.map((m) => m.liters));
      // 0 L -> 258 (svg x axis height aprox)    MAX L -> 0
      monthsOfTheYear.forEach((m) => (m.svgOffset = 258 - 258 * (m.liters / maxLiters)));
    }
  }

  public getRainDataForDaysInMonthAndYear(month: number, year: number): RainData[] {
    return this.allDaysRainData.filter((d) => d.date.getMonth() === month && d.date.getFullYear() === year);
  }

  public getRainDataForMonthsInYear(year: number): RainData[] {
    return this.allMonthsRainData.filter((m) => m.date.getFullYear() === year);
  }
}
