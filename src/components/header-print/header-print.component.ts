import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, of, startWith, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header-print',
  templateUrl: './header-print.component.html',
  styleUrls: ['./header-print.component.scss'],
})
export class HeaderPrintComponent implements OnInit, OnDestroy {
  private readonly onDestroySubscriptions$ = new Subject<void>();

  protected data: { author: string; date: string } = {} as { author: string; date: string };

  public constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.onDestroySubscriptions$),
        filter((e) => e instanceof NavigationEnd),
        startWith(''), // necessary to trigger last missed event (the component loads after navigation ends)
        switchMap(() => {
          let route = this.activatedRoute;
          while (route.firstChild != null) route = route.firstChild;
          return of(route.snapshot.data);
        })
      )
      .subscribe(({ headerPrint }) => {
        this.data = headerPrint;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroySubscriptions$.next();
    this.onDestroySubscriptions$.complete();
  }
}
