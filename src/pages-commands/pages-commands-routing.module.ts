import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesCommandsComponent } from './pages-commands.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCommandsComponent,
    children: [
      {
        path: '**',
        redirectTo: '', // TODO establish default command
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesCommandsRoutingModule {}
