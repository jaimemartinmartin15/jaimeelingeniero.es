import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleTimeComponent } from './sample-time.component';

const routes: Routes = [
  {
    path: '',
    title: 'SampleTime rxjs',
    component: SampleTimeComponent,
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
export class SampleTimeRoutingModule {}
