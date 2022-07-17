import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RxjsPageComponent } from './rxjs-page.component';

const routes: Route[] = [
  {
    path: '',
    component: RxjsPageComponent,
    children: [
      {
        path: 'auditTime',
        loadChildren: () =>
          import('../operators/audit-time/audit-time.module').then(
            (m) => m.AuditTimeModule
          ),
      },
      {
        path: 'combineLatestWith',
        loadChildren: () =>
          import(
            '../operators/combine-latest-with/combine-latest-with.module'
          ).then((m) => m.CombineLatestWithModule),
      },
      {
        path: 'concatMap',
        loadChildren: () =>
          import('../operators/concat-map/concat-map.module').then(
            (m) => m.ConcatMapModule
          ),
      },
      {
        path: 'debounceTime',
        loadChildren: () =>
          import('../operators/debounce-time/debounce-time.module').then(
            (m) => m.DebounceTimeModule
          ),
      },
      {
        path: 'distinct',
        loadChildren: () =>
          import('../operators/distinct/distinct.module').then(
            (m) => m.DistinctModule
          ),
      },
      {
        path: 'distinctUntilChanged',
        loadChildren: () =>
          import(
            '../operators/distinct-until-changed/distinct-until-changed.module'
          ).then((m) => m.DistinctUntilChangedModule),
      },
      {
        path: 'takeWhile',
        loadChildren: () =>
          import('../operators/take-while/take-while.module').then(
            (m) => m.TakeWhileModule
          ),
      },
      {
        path: 'filter',
        loadChildren: () =>
          import('../operators/filter/filter.module').then(
            (m) => m.FilterModule
          ),
      },
      {
        path: 'takeUntil',
        loadChildren: () =>
          import('../operators/take-until/take-until.module').then(
            (m) => m.TakeUntilModule
          ),
      },
      {
        path: 'take',
        loadChildren: () =>
          import('../operators/take/take.module').then((m) => m.TakeModule),
      },
      {
        path: 'first',
        loadChildren: () =>
          import('../operators/first/first.module').then((m) => m.FirstModule),
      },
      {
        path: 'skip',
        loadChildren: () =>
          import('../operators/skip/skip.module').then((m) => m.SkipModule),
      },
      {
        path: 'sampleTime',
        loadChildren: () =>
          import('../operators/sample-time/sample-time.module').then(
            (m) => m.SampleTimeModule
          ),
      },
      {
        path: 'endWith',
        loadChildren: () =>
          import('../operators/end-with/end-with.module').then(
            (m) => m.EndWithModule
          ),
      },
      {
        path: 'observable',
        loadChildren: () =>
          import('../observable/observable.module').then(
            (m) => m.ObservableModule
          ),
      },
      {
        path: 'mergeMap',
        loadChildren: () =>
          import('../operators/merge-map/merge-map.module').then(
            (m) => m.MergeMapModule
          ),
      },
      {
        path: 'switchMap',
        loadChildren: () =>
          import('../operators/switch-map/switch-map.module').then(
            (m) => m.SwitchMapModule
          ),
      },
      {
        path: 'exhaustMap',
        loadChildren: () =>
          import('../operators/exhaust-map/exhaust-map.module').then(
            (m) => m.ExhaustMapModule
          ),
      },
      {
        path: 'forkJoin',
        loadChildren: () =>
          import('../operators/fork-join/fork-join.module').then(
            (m) => m.ForkJoinModule
          ),
      },
      {
        path: 'startWith',
        loadChildren: () =>
          import('../operators/start-with/start-with.module').then(
            (m) => m.StartWithModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsPageRoutingModule {}
