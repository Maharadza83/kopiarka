import { Route } from '@angular/router';
import { AuthRoutingComponent } from './auth-routing.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

export default [
  {
    path: '',
    component: AuthRoutingComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
] satisfies Route[];
