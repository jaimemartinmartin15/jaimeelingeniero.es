import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header-print',
  templateUrl: './header-print.component.html',
  styleUrls: ['./header-print.component.scss'],
})
export class HeaderPrintComponent implements OnInit, OnDestroy {
  private readonly onDestroySubscriptions$ = new Subject<void>();

  protected data: { author: string; date: string } = {} as { author: string; date: string };

  @Input()
  public updateInfo$?: Observable<void>;

  public constructor(private readonly activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    // for rxjs pages, the header print is not in the html component of the activated route, but a child
    if (this.activatedRoute.snapshot.data['headerPrint'] != null) {
      this.data = this.activatedRoute.snapshot.data['headerPrint'];
    }

    // rxjs pages notify the activate child page through this Observable
    if (this.updateInfo$ != undefined) {
      this.updateInfo$.pipe(takeUntil(this.onDestroySubscriptions$)).subscribe(() => {
        let route = this.activatedRoute;
        while (route.firstChild != null) route = route.firstChild;
        this.data = route.snapshot.data['headerPrint'];
      });
    }
  }

  public ngOnDestroy(): void {
    this.onDestroySubscriptions$.next();
    this.onDestroySubscriptions$.complete();
  }
}
