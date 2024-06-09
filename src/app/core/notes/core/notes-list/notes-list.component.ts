import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { NotesService } from '@copy/services/notes.service';
import { INote } from '../../../../models/i-note';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    MatPaginator,
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  private readonly notesService: NotesService = inject(NotesService);
  public readonly displayedColumns: string[] = [ 'id', 'name', 'author', 'creationDate' ];
  public readonly datasource: Signal<INote[]> = toSignal(this.notesService.getAllNotes().pipe(catchError(() => of([]))));
}
