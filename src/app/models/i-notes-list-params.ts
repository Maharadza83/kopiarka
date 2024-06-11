import { SortDirection } from '@angular/material/sort';

export interface INotesListParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: SortDirection;
}