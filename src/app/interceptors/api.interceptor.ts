import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs';
import { UserStore } from '@copy/store/user.store';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const userStore = inject(UserStore);
  const newReq = request.clone({
    setHeaders: {
      Token: userStore.getToken(),
    },
  });


  return next(newReq).pipe(
    catchError((e) => {
      if (e.status === 401) {
        userStore.logOut();
      }
      throw e;
    }),
  );
};

