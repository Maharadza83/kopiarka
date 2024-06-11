import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { ToastrService } from 'ngx-toastr';
import { INote } from '../models/i-note';
import { INotesList } from '../models/i-notes-list';
import { INotesListParams } from '../models/i-notes-list-params';


@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;
  private toastrService: ToastrService = inject(ToastrService);

  public getSingleNote(id: string): Observable<INote> {
    return this.httpClient.get<INote>(`${this.apiUrl}/notes/GetNoteById/${id}`);
  }

  public updateSingleNote(id: string, name: string, content: string): Observable<INote> {
    return this.httpClient.put<INote>(`${this.apiUrl}/notes/UpdateNote/${id}`, { name, content }).pipe(
      catchError(() => {
        this.toastrService.error('2137 nie mozna zaaktualizowac');
        return of(null);
      }),
    );
  }

  public deleteSingleNote(id: string): Observable<INote> {
    return this.httpClient.delete<INote>(`${this.apiUrl}/notes/DeleteNoteById/${id}`);
  }

  public getAllNotes(params?: Partial<INotesListParams>): Observable<INotesList> {
    const queryParams = new HttpParams();

    if (params) {
      for (const [ key, value ] of Object.entries(params)) {
        queryParams.set(key, value);
      }
    }

    return this.httpClient.get<INotesList>(`${this.apiUrl}/notes/GetAllNotes`, { params }).pipe(
      catchError(() => {
        this.toastrService.error('420 przerwa techniczna');
        return of(null);
      }),
    );
  }

  public addNote(name: string, content: string, file?: File): Observable<INote> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);

    if (file) {
      formData.append('FormFile', file);
    }

    return this.httpClient.post<INote>(`${this.apiUrl}/notes/AddNote`, formData).pipe(
      catchError(() => {
        this.toastrService.error('420 przerwa techniczna');
        return of(null);
      }),
    );
  }
}