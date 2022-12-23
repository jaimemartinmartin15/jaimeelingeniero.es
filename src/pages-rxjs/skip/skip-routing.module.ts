import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkipComponent } from './skip.component';

const routes: Routes = [
  {
    path: '',
    title: 'Skip rxjs',
    component: SkipComponent,
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
export class SkipRoutingModule {}