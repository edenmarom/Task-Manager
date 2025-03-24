import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private store = inject(Store<ReadonlyArray<User>>);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  signupForm: FormGroup;

  constructor() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  private passwordsMatch(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  signupHandler() {
    if (this.signupForm.invalid) {
      console.error('Invalid form submission', this.signupForm.errors);
      return;
    } // TODO: check if needed

    console.log('Signup successful', this.signupForm.value);

    // Dispatch action to store user or navigate
    // this.store.dispatch(signupUser({ email: this.signupForm.value.email, password: this.signupForm.value.password }));
    // this.router.navigate(['/dashboard']);
  }
}
