import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTrayectoryComponent } from './my-trayectory.component';

const routes: Routes = [
  {
    path: '',
    title: 'Trayectoria',
    component: MyTrayectoryComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTrayectoryRoutingModule { }
