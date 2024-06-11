import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes-routing',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './notes-routing.component.html',
  styleUrl: './notes-routing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesRoutingComponent {

}
