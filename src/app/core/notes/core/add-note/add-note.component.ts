import { ChangeDetectionStrategy, Component, DestroyRef, inject, Injector, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '@copy/services/notes.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, skip, switchMap, take, tap } from 'rxjs';
import { INote } from '@copy/models/i-note';
import { NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

interface IUpdateNote {
  name: FormControl<string>;
  content: FormControl<string>;
}

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    MatInput,
    MatButton,
    MatLabel,
    RouterLink,
    CdkTextareaAutosize,
    ReactiveFormsModule,
    NgTemplateOutlet,
    MatProgressSpinner,
    MatError,
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNoteComponent implements OnInit {
  private readonly notesService: NotesService = inject(NotesService);
  private readonly router: Router = inject(Router);
  private readonly injector: Injector = inject(Injector);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly toastrService: ToastrService = inject(ToastrService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup<IUpdateNote>;
  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly noteLoading: WritableSignal<boolean> = signal(false);

  public file: File;

  public readonly isEditMode: Signal<boolean> = toSignal(
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => {
        return of(id?.length > 0 || false);
      }),
    ),
  );

  public readonly editedNote: Signal<INote> = toSignal(
    this.activatedRoute.params.pipe(
      tap(() => this.noteLoading.set(true)),
      switchMap(({ id }) => {
        if (this.isEditMode()) {
          return this.notesService.getSingleNote(id);
        }

        return of(null);
      }),
      tap(() => this.noteLoading.set(false)),
      catchError(() => {
        this.router.navigate([ '/notes/list' ]);
        this.toastrService.error('Note does not exist.');
        return of(null);
      }),
    ),
  );

  public ngOnInit(): void {
    this.buildForm();
    this.patchFormListener();
  }

  public onFileChange(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  public addHandler() {
    const { name, content } = this.form.getRawValue();
    this.notesService.addNote(name, content, this.file).subscribe(({ id }) => {
      this.router.navigate([ '/notes', id ]).then(() => {
        this.toastrService.success('Note added successfully.');
      });
    });
  }

  public editHandler(): void {
    const { name, content } = this.form.getRawValue();
    const id = this.activatedRoute.snapshot.params['id'];
    this.notesService.updateSingleNote(id, name, content).subscribe(({ id }) => {
      this.router.navigate([ '/notes', id ]).then(() => {
        this.toastrService.success('Note modified successfully.');
      });
    });
  }

  public submitHandler(): void {
    if (this.form.valid && !this.loading()) {
      this.isEditMode() ? this.editHandler() : this.addHandler();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<IUpdateNote>({
      name: new FormControl(null, [ Validators.required, Validators.maxLength(64) ]),
      content: new FormControl(null, [ Validators.required, Validators.maxLength(32000) ]),
    });
  }

  private patchFormListener(): void {
    if (this.isEditMode()) {
      toObservable(this.editedNote, { injector: this.injector }).pipe(
        skip(1),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(({ name, content }) => {
        this.form.patchValue({
          name,
          content,
        });
      });
    }
  }
}
