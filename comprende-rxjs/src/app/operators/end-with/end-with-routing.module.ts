import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndWithComponent } from './end-with.component';

const routes: Routes = [
  {
    path: '',
    component: EndWithComponent,
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
export class EndWithRoutingModule {}