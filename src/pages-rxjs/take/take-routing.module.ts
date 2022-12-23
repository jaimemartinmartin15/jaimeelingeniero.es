import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeComponent } from './take.component';

const routes: Routes = [
  {
    path: '',
    title: 'Take rxjs',
    component: TakeComponent,
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
export class TakeRoutingModule {}