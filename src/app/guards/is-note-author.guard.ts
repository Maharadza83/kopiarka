import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserStore } from '@copy/store/user.store';
import { NotesService } from '@copy/services/notes.service';

export const isNoteAuthorGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const notesService = inject(NotesService);
  const router = inject(Router);
  const userStore = inject(UserStore);

  return notesService.getSingleNote(_route.params['id']).pipe(
    map(({ author }) => {
      const isAnAuthor = author === userStore.user();

      if (isAnAuthor) {
        return true;
      }

      return router.parseUrl('/notes/list');
    }),
    catchError(() => {
      router.navigate([ '/notes/list' ]);
      return of(false);
    }),
  );
};
