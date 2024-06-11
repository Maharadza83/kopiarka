import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserStore } from '@copy/store/user.store';

export const isLoggedOutGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userStore = inject(UserStore);

  if (userStore.user() === null) {
    return true;
  }

  return authService.getSelf().pipe(
    map((user) => {
      if (!user) {
        return true;
      } else {
        return router.parseUrl('/notes/list');
      }
    }),
    catchError(() => {
      return of(true);
    }),
  );
};
