import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { UserStore } from '@copy/store/user.store';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgClass,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly userStore: UserStore = inject(UserStore);

  public readonly user: Signal<string> = this.userStore.user;

  public logOutHandler(): void {
    this.userStore.logOut();
  }
}
