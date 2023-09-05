import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainComponent } from './rain.component';

const routes: Routes = [
  {
    path: '',
    component: RainComponent,
    title: 'Lluvia caída del cielo',
    data: {
      metaTags: {
        description: 'En esta página podrás ver lo que ha llovido en la zona que vivo a lo largo del tiempo.',
        keywords: ['lluvia', 'tiempo', 'precipitacion'],
        favIcon: 'assets/pages-weather/rain/favicons/favicon-{size}x{size}.png',
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
export class RainRoutingModule {}
