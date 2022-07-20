import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutableLateralMenuComponent } from './routable-lateral-menu.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: '',
    component: RoutableLateralMenuComponent,
    children: [
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
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutableLateralMenuRoutingModule {}
