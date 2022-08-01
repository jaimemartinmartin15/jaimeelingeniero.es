import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FromComponent } from './from.component';

const routes: Routes = [
  {
    path: '',
    component: FromComponent,
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
export class FromRoutingModule {}