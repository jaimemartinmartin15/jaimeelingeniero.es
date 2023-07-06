import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable()
export class RainDataResolver implements Resolve<string[]> {
  public constructor(private readonly http: HttpClient) {}

  public resolve(): Observable<string[]> {
    return this.http.get('assets/pages-weather/rain/rain-data.txt', { responseType: 'text' }).pipe(
      map(
        // ignore commented and empty lines
        (response) => response.split('\n').filter((l) => !l.trim().startsWith('//') && l.trim() !== '')
      ),
      // remove comments in lines that contain data
      map((lines) => lines.map((l) => l.substring(0, l.indexOf('//') !== -1 ? l.indexOf('//') : l.length).trim()))
    );
  }
}
