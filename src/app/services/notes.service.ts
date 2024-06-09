import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { ToastrService } from 'ngx-toastr';
import { INote } from '../models/i-note';


@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;
  private toastrService: ToastrService = inject(ToastrService);

  public getSingleNote(id: string): Observable<INote> {
    return this.httpClient.get<INote>(`${this.apiUrl}/notes/${id}`).pipe(
      catchError(() => {
        this.toastrService.error('2137 notatka nie istnieje');
        return of();
      }),
    );
  }

  public updateSingleNote(id: string, name: string, content: string): Observable<INote> {
    return this.httpClient.put<INote>(`${this.apiUrl}/notes/${id}`, { name, content }).pipe(
      catchError(() => {
        this.toastrService.error('2137 nie mozna zaaktualizowac');
        return of();
      }),
    );
  }

  public deleteSingleNote(id: string): Observable<INote> {
    return this.httpClient.delete<INote>(`${this.apiUrl}/notes/${id}`).pipe(
      catchError(() => {
        this.toastrService.error('2137 notatka nie moze zostac usunieta');
        return of();
      }),
    );
  }

  public getAllNotes(): Observable<INote[]> {
    return this.httpClient.get<INote[]>(`${this.apiUrl}/notes`).pipe(
      catchError(() => {
        this.toastrService.error('420 przerwa techniczna');
        return of();
      }),
    );
  }

  public addNote(name: string, content: string): Observable<INote> {
    return this.httpClient.post<INote>(`${this.apiUrl}/notes`, { name, content }).pipe(
      catchError(() => {
        this.toastrService.error('420 przerwa techniczna');
        return of();
      }),
    );
  }
}