import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntervalComponent } from './interval.component';

const routes: Routes = [
  {
    path: '',
    title: 'Interval rxjs',
    component: IntervalComponent,
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
export class IntervalRoutingModule {}
