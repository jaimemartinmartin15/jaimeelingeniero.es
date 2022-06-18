import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRxjsComponent } from './pages-rxjs.component';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: '',
    component: PagesRxjsComponent,
    children: [
      {
        path: 'takeUntil',
        loadChildren: () => import('./take-until/take-until.module').then((m) => m.TakeUntilModule),
      },
      {
        path: 'take',
        loadChildren: () => import('./take/take.module').then((m) => m.TakeModule),
      },
      {
        path: 'first',
        loadChildren: () => import('./first/first.module').then((m) => m.FirstModule),
      },
      {
        path: 'skip',
        loadChildren: () => import('./skip/skip.module').then((m) => m.SkipModule),
      },
      {
        path: 'distinctUntilChanged',
        loadChildren: () => import('./distinct-until-changed/distinct-until-changed.module').then((m) => m.DistinctUntilChangedModule),
      },
      {
        path: 'auditTime',
        loadChildren: () => import('./audit-time/audit-time.module').then((m) => m.AuditTimeModule),
      },
      {
        path: 'sampleTime',
        loadChildren: () => import('./sample-time/sample-time.module').then((m) => m.SampleTimeModule),
      },
      {
        path: 'debounceTime',
        loadChildren: () => import('./debounce-time/debounce-time.module').then((m) => m.DebounceTimeModule),
      },
      {
        path: 'endWith',
        loadChildren: () => import('./end-with/end-with.module').then((m) => m.EndWithModule),
      },
      {
        path: 'observable',
        loadChildren: () => import('./observable/observable.module').then((m) => m.ObservableModule),
      },
      {
        path: 'mergeMap',
        loadChildren: () => import('./merge-map/merge-map.module').then((m) => m.MergeMapModule),
      },
      {
        path: 'concatMap',
        loadChildren: () => import('./concat-map/concat-map.module').then((m) => m.ConcatMapModule),
      },
      {
        path: 'switchMap',
        loadChildren: () => import('./switch-map/switch-map.module').then((m) => m.SwitchMapModule),
      },
      {
        path: 'combineLatestWith',
        loadChildren: () => import('./combine-latest-with/combine-latest-with.module').then((m) => m.CombineLatestWithModule),
      },
      {
        path: 'exhaustMap',
        loadChildren: () => import('./exhaust-map/exhaust-map.module').then((m) => m.ExhaustMapModule),
      },
      {
        path: 'forkJoin',
        loadChildren: () => import('./fork-join/fork-join.module').then((m) => m.ForkJoinModule),
      },
      {
        path: 'startWith',
        loadChildren: () => import('./start-with/start-with.module').then((m) => m.StartWithModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRxjsRoutingModule {}
