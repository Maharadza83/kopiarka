import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-routing',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './auth-routing.component.html',
  styleUrl: './auth-routing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRoutingComponent {

}
