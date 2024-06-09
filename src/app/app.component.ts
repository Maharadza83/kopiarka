import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStore } from '@copy/store/user.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly userStore: UserStore = inject(UserStore);

  public ngOnInit(): void {
    this.userStore.getSelf();
  }
}
