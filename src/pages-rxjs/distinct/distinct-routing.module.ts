import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistinctComponent } from './distinct.component';

const routes: Routes = [
  {
    path: '',
    component: DistinctComponent,
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
export class DistinctRoutingModule {}