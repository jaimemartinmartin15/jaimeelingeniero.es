import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map } from 'rxjs';
import { COMMENT, LINE_SEPARATOR } from './constants';
import { FileLine } from './file-line';

@Injectable()
export class RainDataResolver implements Resolve<FileLine[]> {
  public constructor(private readonly http: HttpClient) {}

  public resolve(): Observable<FileLine[]> {
    return this.http.get('assets/no-cached/pages-weather/rain/rain-data.txt', { responseType: 'text' }).pipe(
      map((response: string) =>
        response
          .split(/\r?\n/) // divide the lines
          .filter((l) => !l.trim().startsWith(COMMENT) && l.trim() !== '') // Ignore commented and empty lines
          .map((l) => l.substring(0, l.indexOf(COMMENT) !== -1 ? l.indexOf(COMMENT) : l.length).trim()) // Remove comments and spaces in lines that contain data
          .map((l) => {
            const [date, liters, bulletColor, popUpContent] = l.split(LINE_SEPARATOR);
            return {
              date: date.trim(),
              liters: liters.trim(),
              bulletColor: bulletColor?.trim() ?? '',
              popUpContent: popUpContent?.trim() ?? '',
            };
          })
      )
    );
  }
}
