import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

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
  ],
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleNoteComponent {

}
