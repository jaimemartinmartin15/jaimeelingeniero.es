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
        (response) =>
          response
            .split(/\r?\n/) // divide the lines
            .filter((l) => !l.trim().startsWith('#') && l.trim() !== '') // Ignore commented and empty lines
            .map((l) => l.substring(0, l.indexOf('#') !== -1 ? l.indexOf('#') : l.length).trim()) // Remove comments in lines that contain data
      )
    );
  }
}
