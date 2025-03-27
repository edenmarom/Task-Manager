import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../state/selectors/user.selectors';
import { map } from 'rxjs';
import { TaskManagerState } from '../state/reducers/task-manager-state';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<TaskManagerState>);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    map((loggedIn) => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
