import { Routes } from '@angular/router';
import { ShellComponent } from '@copy/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@copy/core/home/home.routes'),
      },
      {
        path: 'auth',
        loadChildren: () => import('@copy/core/auth/auth.routes'),
      },
      {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
    ],
  },
];
