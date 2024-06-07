import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

export interface INotesListElement {
  author: string;
  id: string;
  name: string;
  creationDate: string;
}

const dummyNotes: INotesListElement[] = [
  {
    author: 'Crystal Grant',
    id: '0f662161-2694-47f3-a383-74b98c642f1c',
    name: 'Cost trial late tend research.',
    creationDate: '2001-04-20T00:51:28',
  },
  {
    author: 'Anthony Mason',
    id: 'c581d240-cdd1-4c3b-b676-9180d2617e3a',
    name: 'Hope set here I.',
    creationDate: '2016-11-20T20:27:53',
  },
  {
    author: 'Kaitlyn Weaver',
    id: '845e1fe9-6481-44db-8630-56504b727be5',
    name: 'Site firm doctor staff.',
    creationDate: '1985-04-14T01:12:06',
  },
  {
    author: 'Frederick Jennings',
    id: 'debd9106-f3b4-488e-b78e-69e446d9b94c',
    name: 'Conference avoid.',
    creationDate: '1993-05-16T04:53:49',
  },
  {
    author: 'Stephanie Pope',
    id: 'c6c55f0f-3b6d-4269-867c-a62a6c43be35',
    name: 'Bed yet.',
    creationDate: '2012-03-30T10:33:34',
  },
  {
    author: 'Brian Kelley',
    id: 'c5c00b44-d3a3-470f-9483-8267a8406ce1',
    name: 'Piece himself though.',
    creationDate: '1986-07-07T04:35:52',
  },
  {
    author: 'Kayla Livingston',
    id: '189c65d8-742c-4677-9cb5-86f00139c132',
    name: 'College most assume.',
    creationDate: '1982-03-17T23:58:01',
  },
  {
    author: 'Deborah Robinson',
    id: '0d671d95-8b1e-4598-a389-29e040065b94',
    name: 'Smile she.',
    creationDate: '1990-10-15T10:34:36',
  },
  {
    author: 'Donna Jones',
    id: 'f2444961-2786-4b63-b55e-1604b94b3b54',
    name: 'Personal keep degree.',
    creationDate: '1972-08-10T07:40:58',
  },
  {
    author: 'Laura Leon',
    id: 'dd171b01-8b03-4ebc-90d2-31a5e03e0418',
    name: 'Sound according start.',
    creationDate: '2000-04-25T13:11:13',
  },
  {
    author: 'Carl Garcia',
    id: 'fdffd367-5363-4a04-b652-bf9fa1c62c8b',
    name: 'Kid low customer four specific.',
    creationDate: '1998-04-03T03:45:51',
  },
  {
    author: 'Amy Anderson',
    id: 'ed488a23-f052-4661-b917-f9d82319686b',
    name: 'Candidate behind board pressure minute.',
    creationDate: '1987-02-06T08:01:49',
  },
  {
    author: 'Mallory Walker',
    id: 'b68dedff-52a2-45e1-ba59-66630dbdfd3d',
    name: 'Before charge whose.',
    creationDate: '2020-05-21T03:20:35',
  },
  {
    author: 'Austin Sanchez',
    id: '25f1de6c-c634-4ef9-ba75-e22ec76a6fd2',
    name: 'A something.',
    creationDate: '2003-05-23T05:38:28',
  },
  {
    author: 'Nicholas Smith',
    id: '6c6d58d7-8283-4ad8-bf6f-70e3af4e1995',
    name: 'Election rate know.',
    creationDate: '1985-12-07T19:52:19',
  },
  {
    author: 'Brenda Powers',
    id: '1173c7f2-0b75-4fe4-8ef0-ddada560cab9',
    name: 'Power very sure political.',
    creationDate: '1992-12-02T05:35:26',
  },
  {
    author: 'Beverly Moore',
    id: 'be4bbeac-44e4-426c-b9c7-d1546528e0c8',
    name: 'Law growth.',
    creationDate: '2006-11-02T22:26:42',
  },
  {
    author: 'Ms. Andrea Higgins',
    id: 'e279efbc-813e-478c-96e9-3661470d9aeb',
    name: 'Herself herself scene environmental after.',
    creationDate: '1995-09-11T12:26:33',
  },
  {
    author: 'Jesse Bennett',
    id: '6862937e-f269-4005-9dfc-ff0b85b8b5ad',
    name: 'Physical first call various establish.',
    creationDate: '1976-07-31T21:54:01',
  },
  {
    author: 'Greg Andersen',
    id: 'fa9a1f56-2328-4165-bdbf-95cd0bcba26c',
    name: 'Knowledge change blue whom.',
    creationDate: '2018-02-18T23:28:08',
  },
];

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
  public readonly displayedColumns: string[] = [ 'id', 'name', 'author', 'creationDate' ];
  public readonly datasource: WritableSignal<INotesListElement[]> = signal(dummyNotes);
}
