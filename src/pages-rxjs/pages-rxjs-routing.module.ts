import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRxjsComponent } from './pages-rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesRxjsComponent,
    children: [
      {
        path: 'observable',
        loadChildren: () => import('./observable/observable.module').then(m => m.ObservableModule)
      },
      {
        path: '',
        redirectTo: 'observable'
      },
      {
        path: '**',
        redirectTo: 'observable',
        pathMatch: 'full'
      },
    ]
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
export class PagesRxjsRoutingModule {}
