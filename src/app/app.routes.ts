import { Routes } from '@angular/router';
import { ShellComponent } from '@copy/shell/shell.component';
import { isLoggedOutGuard } from '@copy/guards/is-logged-out.guard';

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
        canActivate: [ isLoggedOutGuard ],
      },
      {
        path: 'notes',
        loadChildren: () => import('@copy/core/notes/notes.routes'),
      },
      {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
    ],
  },
];
