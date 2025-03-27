import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersApiActions } from '../actions/user.actions';
import { AuthResponse } from '../../interfaces/user.model';
import { Router } from '@angular/router';

interface ServerErrorResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthEffect {
  private actions$: Actions = inject(Actions);
  private authService: AuthService = inject(AuthService);
  private router = inject(Router);

  private handleAuthSuccess(res: AuthResponse) {
    return {
      userId: res.data.userId,
      token: res.data.token,
    };
  }

  private handleAuthFailure(error: any) {
    if (error.status === 409 && error.error) {
      const serverError = error.error as ServerErrorResponse;
      return { err: serverError.message };
    } else if (error.error && error.error.message) {
      return { err: error.error.message };
    } else {
      return {
        err: error.message || 'Something went wrong. Please try again.',
      };
    }
  }

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.signup),
      switchMap(({ email, password }) =>
        this.authService.signup(email, password).pipe(
          map((res: AuthResponse) =>
            UsersApiActions['signup-Success'](this.handleAuthSuccess(res))
          ),
          catchError((error) =>
            of(UsersApiActions['signup-Error'](this.handleAuthFailure(error)))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((res: AuthResponse) =>
            UsersApiActions['login-Success'](this.handleAuthSuccess(res))
          ),
          catchError((error) =>
            of(UsersApiActions['login-Error'](this.handleAuthFailure(error)))
          )
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UsersApiActions['login-Success'],
          UsersApiActions['signup-Success']
        ),
        tap(() => this.router.navigate(['/tasks']))
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersApiActions['login-Error'], UsersApiActions['signup-Error']),
        tap(({ err }) => alert('Authentication failed: ' + err))
      ),
    { dispatch: false }
  );
}
