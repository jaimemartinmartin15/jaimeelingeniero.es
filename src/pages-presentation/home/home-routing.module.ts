import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { calculateCurrentAge } from 'src/utils/dates';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Presentación',
    data: {
      metaTags: {
        description: `Me llamo Jaime, tengo ${calculateCurrentAge(new Date(1996, 10, 15))} años y soy ingeniero informático.`,
        keywords: ['jaime martin martin', 'ingeniero informático'],
      },
    },
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
export class HomeRoutingModule {}
