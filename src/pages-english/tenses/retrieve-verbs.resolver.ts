import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Verb } from './verb';

@Injectable()
export class RetrieveVerbsResolver implements Resolve<Verb[]> {
  public constructor(private readonly http: HttpClient) {}

  public resolve(): Observable<Verb[]> {
    return this.http.get<Verb[]>('/assets/no-cached/pages-english/tenses/verbs.json');
  }
}
