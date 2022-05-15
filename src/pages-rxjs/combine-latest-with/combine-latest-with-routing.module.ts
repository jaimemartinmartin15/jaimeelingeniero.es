import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombineLatestWithComponent } from './combine-latest-with.component';

const routes: Routes = [
  {
    path: '',
    component: CombineLatestWithComponent,
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
export class CombineLatestWithRoutingModule {}
