import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsLayoutPageComponent } from './rxjs-layout-page.component';
import { RxjsLayoutPageResolver } from './rxjs-layout-page.resolver';

const routes: Routes = [
  {
    path: '',
    component: RxjsLayoutPageComponent,
    resolve: [RxjsLayoutPageResolver],
    children: [
      {
        path: 'timer',
        loadChildren: () => import('../timer/timer.module').then((m) => m.TimerModule),
      },
      {
        path: 'interval',
        loadChildren: () => import('../interval/interval.module').then((m) => m.IntervalModule),
      },
      {
        path: 'from',
        loadChildren: () => import('../from/from.module').then((m) => m.FromModule),
      },
      {
        path: 'of',
        loadChildren: () => import('../of/of.module').then((m) => m.OfModule),
      },
      {
        path: 'behaviorSubject',
        loadChildren: () => import('../behavior-subject/behavior-subject.module').then((m) => m.BehaviorSubjectModule),
      },
      {
        path: 'subject',
        loadChildren: () => import('../subject/subject.module').then((m) => m.SubjectModule),
      },
      {
        path: 'distinct',
        loadChildren: () => import('../distinct/distinct.module').then((m) => m.DistinctModule),
      },
      {
        path: 'takeWhile',
        loadChildren: () => import('../take-while/take-while.module').then((m) => m.TakeWhileModule),
      },
      {
        path: 'filter',
        loadChildren: () => import('../filter/filter.module').then((m) => m.FilterModule),
      },
      {
        path: 'takeUntil',
        loadChildren: () => import('../take-until/take-until.module').then((m) => m.TakeUntilModule),
      },
      {
        path: 'take',
        loadChildren: () => import('../take/take.module').then((m) => m.TakeModule),
      },
      {
        path: 'first',
        loadChildren: () => import('../first/first.module').then((m) => m.FirstModule),
      },
      {
        path: 'skip',
        loadChildren: () => import('../skip/skip.module').then((m) => m.SkipModule),
      },
      {
        path: 'distinctUntilChanged',
        loadChildren: () => import('../distinct-until-changed/distinct-until-changed.module').then((m) => m.DistinctUntilChangedModule),
      },
      {
        path: 'auditTime',
        loadChildren: () => import('../audit-time/audit-time.module').then((m) => m.AuditTimeModule),
      },
      {
        path: 'sampleTime',
        loadChildren: () => import('../sample-time/sample-time.module').then((m) => m.SampleTimeModule),
      },
      {
        path: 'debounceTime',
        loadChildren: () => import('../debounce-time/debounce-time.module').then((m) => m.DebounceTimeModule),
      },
      {
        path: 'endWith',
        loadChildren: () => import('../end-with/end-with.module').then((m) => m.EndWithModule),
      },
      {
        path: 'observable',
        loadChildren: () => import('../observable/observable.module').then((m) => m.ObservableModule),
      },
      {
        path: 'mergeMap',
        loadChildren: () => import('../merge-map/merge-map.module').then((m) => m.MergeMapModule),
      },
      {
        path: 'concatMap',
        loadChildren: () => import('../concat-map/concat-map.module').then((m) => m.ConcatMapModule),
      },
      {
        path: 'switchMap',
        loadChildren: () => import('../switch-map/switch-map.module').then((m) => m.SwitchMapModule),
      },
      {
        path: 'combineLatestWith',
        loadChildren: () => import('../combine-latest-with/combine-latest-with.module').then((m) => m.CombineLatestWithModule),
      },
      {
        path: 'exhaustMap',
        loadChildren: () => import('../exhaust-map/exhaust-map.module').then((m) => m.ExhaustMapModule),
      },
      {
        path: 'forkJoin',
        loadChildren: () => import('../fork-join/fork-join.module').then((m) => m.ForkJoinModule),
      },
      {
        path: 'startWith',
        loadChildren: () => import('../start-with/start-with.module').then((m) => m.StartWithModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsLayoutPageRoutingModule {}
