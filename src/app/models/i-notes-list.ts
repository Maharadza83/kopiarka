import { INote } from './i-note';

export interface INotesList {
  notes: INote[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}