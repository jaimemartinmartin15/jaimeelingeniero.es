import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sql',
    loadChildren: () => import('./sql/sql.module').then((m) => m.SqlModule),
  },
  {
    path: '**',
    redirectTo: 'sql',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BBDDRoutingModule {}
