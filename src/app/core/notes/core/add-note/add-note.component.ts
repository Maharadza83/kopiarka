import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNoteComponent {

}
