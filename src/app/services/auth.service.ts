import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;
  private toastrService: ToastrService = inject(ToastrService);

  public login(username: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password });
  }

  public register(username: string, password: string): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/auth/register`, { username, password });
  }

  public xregister(username: string, password: string): Observable<{ name: string }> {
    return this.httpClient.put<{ name: string }>(`${this.apiUrl}/auth/register`, { username, password }).pipe(
      catchError(() => {
        this.toastrService.error('Użytkownik o takim mailu lub nazwie już istnieje');
        return of(null);
      }),
    );
  }

  public getSelf(): Observable<{ username: string }> {
    return this.httpClient.get<{ username: string }>(`${this.apiUrl}/auth/self`);
  }
}
