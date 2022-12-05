import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeWhileComponent } from './take-while.component';

const routes: Routes = [
  {
    path: '',
    title: 'TakeWhile rxjs',
    component: TakeWhileComponent,
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
export class TakeWhileRoutingModule {}
