import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserStore } from '@copy/store/user.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ILoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatButton, RouterLink, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly userStore: UserStore = inject(UserStore);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup<ILoginForm>;
  public readonly loading: Signal<boolean> = this.userStore.loading;

  public ngOnInit(): void {
    this.buildForm();
  }

  public loginHandler() {
    if (this.form.valid && !this.loading()) {
      const { username, password } = this.form.getRawValue();
      this.userStore.login(username, password);
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<ILoginForm>({
      username: new FormControl(null, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
    });
  }

}
