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
    ],
  },
];
