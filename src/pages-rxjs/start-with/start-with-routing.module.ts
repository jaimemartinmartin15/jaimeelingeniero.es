import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWithComponent } from './start-with.component';

const routes: Routes = [
  {
    path: '',
    title: 'StartWith rxjs',
    component: StartWithComponent,
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
export class StartWithRoutingModule {}
