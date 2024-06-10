import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotesService } from '@copy/services/notes.service';
import { INote } from '../../../../models/i-note';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { INotesList } from '../../../../models/i-notes-list';
import { INotesListParams } from '../../../../models/i-notes-list-params';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortHeader, Sort, SortDirection } from '@angular/material/sort';

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
    RouterLink,
    NgTemplateOutlet,
    MatProgressSpinner,
    MatSort,
    MatSortHeader,
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  private readonly notesService: NotesService = inject(NotesService);
  public readonly displayedColumns: string[] = [ 'id', 'name', 'author', 'creationDate' ];

  public readonly page: WritableSignal<number> = signal(0);
  public readonly pageSize: WritableSignal<number> = signal(10);
  public readonly sortBy: WritableSignal<string> = signal(null);
  public readonly sortOrder: WritableSignal<SortDirection> = signal(null);

  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly isInitialLoading: Signal<boolean> = computed(() => {
    const hasNoResponse = this.response() === undefined;
    return hasNoResponse && this.loading();
  });

  public readonly params: Signal<INotesListParams> = computed(() => {
    return {
      page: this.page() + 1,
      pageSize: this.pageSize(),
      sortBy: this.sortBy(),
      sortOrder: this.sortOrder(),
    };
  });

  public readonly response: Signal<INotesList> = toSignal(
    toObservable(this.params).pipe(
      tap(() => this.loading.set(true)),
      switchMap(params => this.notesService.getAllNotes(params)),
      tap(() => this.loading.set(false)),
      catchError(() => of(null)),
    ),
  );

  public readonly datasource: Signal<INote[]> = computed(() => this.response()?.notes);
  public readonly totalCount: Signal<number> = computed(() => this.response()?.totalCount);
  public readonly isEmpty: Signal<boolean> = computed(() => this.response()?.totalCount === 0);

  public changePagination(pagination: PageEvent): void {
    const { pageIndex, pageSize } = pagination;
    this.page.set(pageIndex);
    this.pageSize.set(pageSize);
  }

  public changeSort(sort: Sort): void {
    const { active, direction } = sort;
    this.sortBy.set(active);
    this.sortOrder.set(direction);
  }
}
