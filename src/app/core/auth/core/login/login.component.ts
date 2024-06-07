import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatButton ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

}
