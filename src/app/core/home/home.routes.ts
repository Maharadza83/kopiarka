import { Route } from '@angular/router';
import { HomeRoutingComponent } from './home-routing.component';
import { HomeViewComponent } from './core/home-view/home-view.component';

export default [
  {
    path: '',
    component: HomeRoutingComponent,
    children: [
      {
        path: '',
        component: HomeViewComponent,
      },
    ],
  },
] satisfies Route[];
