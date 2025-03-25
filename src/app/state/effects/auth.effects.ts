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
  

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.signup),
      switchMap(({ email, password }) =>
        this.authService.signup(email, password).pipe(
          map((res: AuthResponse) =>
            UsersApiActions['signup-Success']({
              userId: res.data.userId,
              token: res.data.token,
            })
          ),
          catchError((error) =>
            {
            if (error.status === 409 && error.error) {
              const serverError = error.error as ServerErrorResponse;
              return of(
                UsersApiActions['signup-Error']({ err: serverError.message })
              );
            } else {
              return of(
                UsersApiActions['signup-Error']({
                  err: error.message || 'Signup failed',
                })
              );
            }
          }
          )
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersApiActions['signup-Success']),
        tap(() => this.router.navigate(['/tasks']))
      ),
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersApiActions['signup-Error']),
        tap(({ err }) => {
          alert('Signup failed: ' + err);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((res: AuthResponse) =>
            UsersApiActions['login-Success']({
              userId: res.data.userId,
              token: res.data.token,
            })
          ),
          catchError((error: { message: string }) =>
            of(UsersApiActions['login-Error']({ err: error.message }))
          )
        )
      )
    )
  );
}
