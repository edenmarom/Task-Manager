import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { UsersApiActions } from '../actions/user.actions';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';


@Injectable()
export class UserEffect {
  private actions$: Actions = inject(Actions);
  private userService: UserService = inject(UserService);

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.getUserData),
      takeUntil(this.actions$.pipe(ofType(UsersApiActions.logout))),
      switchMap(() =>
        this.userService.getUserData().pipe(
          map((user: User | null) => {
            let convertedUser = user as User;
            if (convertedUser) {
              return UsersApiActions['getUserData-Success']({
                user: convertedUser,
              });
            } else {
              return UsersApiActions['getUserData-Error']({
                err: 'Error getting user data',
              });
            }
          }),
          catchError((error: { message: string }) =>
            of(UsersApiActions['getUserData-Error']({ err: error.message }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.updateUser),
      switchMap(({ updatedUser }) =>
        this.userService.updateUser(updatedUser).pipe(
          takeUntil(this.actions$.pipe(ofType(UsersApiActions.logout))),
          map((user: User) =>
            UsersApiActions['updateUser-Success']({ updatedUser: user })
          ),
          catchError((error: { message: string }) =>
            of(UsersApiActions['updateUser-Error']({ err: error.message }))
          )
        )
      )
    )
  );
}
