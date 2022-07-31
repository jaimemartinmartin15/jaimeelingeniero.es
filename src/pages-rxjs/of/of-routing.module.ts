import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfComponent } from './of.component';

const routes: Routes = [
  {
    path: '',
    component: OfComponent,
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
export class OfRoutingModule {}