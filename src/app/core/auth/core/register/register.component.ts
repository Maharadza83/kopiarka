import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserStore } from '@copy/store/user.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface IRegisterForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  private readonly userStore: UserStore = inject(UserStore);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup<IRegisterForm>;

  public readonly loading: Signal<boolean> = this.userStore.loading;

  public ngOnInit(): void {
    this.buildForm();
  }

  public registerHandler() {
    if (this.form.valid && !this.loading()) {
      const { username, password } = this.form.getRawValue();
      this.userStore.register(username, password);
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<IRegisterForm>({
      username: new FormControl(null, [ Validators.required, Validators.maxLength(64) ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(128) ]),
    });
  }
}
