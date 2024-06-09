import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toastrService: ToastrService = inject(ToastrService);

  private readonly _user: WritableSignal<string> = signal(null);
  public readonly user: Signal<string> = computed(() => this._user());

  private readonly _loading: WritableSignal<boolean> = signal(false);
  public readonly loading: Signal<boolean> = computed(() => this._loading());

  public register(username: string, password: string): void {
    this.startLoading();
    this.authService.register(username, password).subscribe(() => {
        this.router.navigate([ '/auth/login' ]).then(() => this.toastrService.success('Zarejestrowano!'));
      }, () => {
      },
      () => this.stopLoading(),
    );
  }

  public login(username: string, password: string): void {
    this.startLoading();
    this.authService.login(username, password).subscribe(({ token }) => {
        localStorage.setItem('bearer', token);
        this.router.navigate([ '/' ]).then(() => {
            this.getSelf();
          },
        );
      }, () => {
      },
      () => this.stopLoading(),
    );
  }

  public logOut(): void {
    this.router.navigate([ '/home' ]).then(() => {
      this._user.set(null);
      localStorage.removeItem('bearer');
    });
  }

  public getSelf(): void {
    if (this.getToken()) {
      this.startLoading();
      this.authService.getSelf().subscribe(({ username }) => {
        this._user.set(username);
        this.stopLoading();
      });
    }

    this.stopLoading();
  }

  public getToken(): string {
    return localStorage.getItem('bearer');
  }

  private startLoading(): void {
    this._loading.set(true);
  }

  private stopLoading(): void {
    this._loading.set(false);
  }
}
