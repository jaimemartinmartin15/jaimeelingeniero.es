import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SqlComponent } from './sql.component';

const routes: Routes = [
  {
    path: '',
    title: 'Lenguaje SQL',
    component: SqlComponent,
    children: [{ path: '**', redirectTo: '' }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SqlRoutingModule {}
