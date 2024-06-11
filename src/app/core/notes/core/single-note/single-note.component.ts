import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { INote } from '@copy/models/i-note';
import { NotesService } from '@copy/services/notes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { catchError, of, switchMap, tap } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { UserStore } from '@copy/store/user.store';
import { UtilsFiles } from '@copy/utils/utils-files';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [
    MatCardActions,
    MatDivider,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    CdkTextareaAutosize,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    DatePipe,
    CdkCopyToClipboard,
    NgTemplateOutlet,
    MatProgressSpinner,
    MatIconButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleNoteComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly toastrService: ToastrService = inject(ToastrService);
  private readonly userStore: UserStore = inject(UserStore);
  private readonly notesService: NotesService = inject(NotesService);

  public readonly loading: WritableSignal<boolean> = signal(false);

  public readonly note: Signal<INote> = toSignal(
    this.activatedRoute.params.pipe(
      tap(() => this.loading.set(true)),
      switchMap(({ id }) => this.notesService.getSingleNote(id)),
      tap(() => this.loading.set(false)),
      catchError(() => {
        this.loading.set(false);
        this.toastrService.error('Note does not exist.');
        return of(null);
      }),
    ),
  );

  public readonly doesNoteExist: Signal<boolean> = computed(() => this.note() !== null);
  public readonly isUserAnAuthor: Signal<boolean> = computed(() => this.userStore.user() === this.note()?.author);
  public readonly isDeleteClickedOnce: WritableSignal<boolean> = signal(false);

  public clickDeleteOnce(): void {
    this.isDeleteClickedOnce.set(true);
  }

  public deleteHandler(): void {
    if (this.isUserAnAuthor()) {
      this.loading.set(true);
      this.notesService.deleteSingleNote(this.activatedRoute.snapshot.params['id'])
        .pipe(
          switchMap(() => {
            return this.router.navigate([ '/notes/list' ]).then(() => {
              this.toastrService.success(`Note ${this.note().name} has been deleted.`);
            });
          }),
          catchError(() => {
            this.loading.set(false);
            this.toastrService.error('Note could not be deleted.');
            return of(null);
          }),
        ).subscribe();
    }
  }

  public downloadHandler(): void {
    UtilsFiles.downloadFile(this.note().fileContent, this.note().name, this.note().fileExtension);
  }
}
