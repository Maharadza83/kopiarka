import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '@copy/services/notes.service';

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
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNoteComponent implements OnInit {
  private readonly notesService: NotesService = inject(NotesService);
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup<IUpdateNote>;
  public readonly loading: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this.buildForm();
  }

  public addHandler() {
    if (this.form.valid && !this.loading()) {
      const { name, content } = this.form.getRawValue();
      this.notesService.addNote(name, content).subscribe(() => {
        this.router.navigate([ '/notes/list' ]);
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<IUpdateNote>({
      name: new FormControl(null, [ Validators.required ]),
      content: new FormControl(null, [ Validators.required ]),
    });
  }
}
