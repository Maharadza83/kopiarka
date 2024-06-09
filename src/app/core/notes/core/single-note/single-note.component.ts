import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { INote } from '../../../../models/i-note';
import { NotesService } from '@copy/services/notes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

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
  ],
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleNoteComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly notesService: NotesService = inject(NotesService);
  public readonly note: Signal<INote> = toSignal(this.notesService.getSingleNote(this.activatedRoute.snapshot.params['id']));
}
