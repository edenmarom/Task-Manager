import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskManagerState } from '../state/reducers/task-manager-state';
import { selectUserAuthData } from '../state/selectors/user.selectors';
import { exhaustMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TASKS_API_BASE_URL } from '../services/tasks.service';
import { USER_API_BASE_URL } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject<Store<TaskManagerState>>(Store);
  const isTasksRequest = req.url.startsWith(TASKS_API_BASE_URL);
  const isUserRequest = req.url.startsWith(USER_API_BASE_URL);

  if (isTasksRequest || isUserRequest) {
    return store.select(selectUserAuthData).pipe(
      take(1),
      exhaustMap((data) => {
        if (data?.token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: data.token,
            },
          });
          return next(cloned);
        }
        return next(req);
      })
    );
  } 
  return next(req);
};
