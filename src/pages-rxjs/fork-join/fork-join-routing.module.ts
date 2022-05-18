import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForkJoinComponent } from './fork-join.component';

const routes: Routes = [
  {
    path: '',
    component: ForkJoinComponent,
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
export class ForkJoinRoutingModule {}
