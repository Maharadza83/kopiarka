import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-routing',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './home-routing.component.html',
  styleUrl: './home-routing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeRoutingComponent {

}
