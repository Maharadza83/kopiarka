import { Route } from '@angular/router';
import { NotesRoutingComponent } from './notes-routing.component';
import { AddNoteComponent } from '@copy/core/notes/core/add-note/add-note.component';
import { NotesListComponent } from './core/notes-list/notes-list.component';
import { SingleNoteComponent } from './core/single-note/single-note.component';


export default [
  {
    path: '',
    component: NotesRoutingComponent,
    children: [
      {
        path: 'add',
        component: AddNoteComponent,
      },
      {
        path: 'list',
        component: NotesListComponent,
      },
      {
        path: ':id',
        component: SingleNoteComponent,
      },
    ],
  },
] satisfies Route[];
