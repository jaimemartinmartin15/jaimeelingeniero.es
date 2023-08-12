import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LineFile, LineType } from './line-file';

@Injectable()
export class RainDataResolver implements Resolve<LineFile[]> {
  public constructor(private readonly http: HttpClient) {}

  public resolve(): Observable<LineFile[]> {
    return this.http.get('assets/no-cached/pages-weather/rain/rain-data.txt', { responseType: 'text' }).pipe(
      map((response) =>
        response
          .split(/\r?\n/) // divide the lines
          .filter((l) => !l.trim().startsWith('#') && l.trim() !== '') // Ignore commented and empty lines
          .map((l) => l.substring(0, l.indexOf('#') !== -1 ? l.indexOf('#') : l.length).trim()) // Remove comments and spaces in lines that contain data
          .map((l) => {
            // split line 'day/month/year-liters[pop up content]' into object
            const splitLine = l.split(/\/|-|\[|\]/);
            const popUpContent = splitLine[4]?.trim() === '' ? undefined : splitLine[4]?.trim();
            return {
              lineType: l.startsWith('xx') ? LineType.MONTH : LineType.DAY,
              day: +splitLine[0],
              month: +splitLine[1] - 1,
              year: +splitLine[2],
              liters: +splitLine[3],
              popUpContent,
            };
          })
      )
    );
  }
}
