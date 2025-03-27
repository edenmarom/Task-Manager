import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.model';
import { Store } from '@ngrx/store';
import { UsersApiActions } from '../../state/actions/user.actions';
import { TaskManagerState } from '../../state/reducers/task-manager-state';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private store = inject(Store<TaskManagerState>);
  private fb = inject(FormBuilder);
  loginForm!: FormGroup<LoginForm>;

  ngOnInit() {
    this.loginForm = this.fb.group<LoginForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginHandler() {
    this.store.dispatch(
      UsersApiActions.login({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      })
    );
  }
}
