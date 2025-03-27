import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Subject } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import { TasksApiActions } from '../actions/tasks.actions';
import { Task } from '../../interfaces/task.model';
import { Store } from '@ngrx/store';
import { TaskManagerState } from '../reducers/task-manager-state';
import { UsersApiActions } from '../actions/user.actions';

@Injectable()
export class TasksEffect {
  private store = inject(Store<TaskManagerState>);
  private actions$: Actions = inject(Actions);
  private tasksService: TasksService = inject(TasksService);
  private destroy$ = new Subject<void>();

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksApiActions.deleteTask),
      switchMap(({ taskId }) =>
        this.tasksService.deleteTask(taskId).pipe(
          takeUntil(this.actions$.pipe(ofType(UsersApiActions.logout))),
          map((task: Object | null) => {
            let convertedTask = task as Task;
            if (convertedTask) {
              return TasksApiActions['deleteTask-Success']({
                taskId: convertedTask._id,
              });
            } else {
              return TasksApiActions['deleteTask-Error']({
                err: 'Error deleting task',
              });
            }
          }),
          catchError((error: { message: string }) =>
            of(TasksApiActions['deleteTask-Error']({ err: error.message }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksApiActions.updateTask),
      switchMap(({ updatedTask }) =>
        this.tasksService.updateTask(updatedTask).pipe(
          takeUntil(this.actions$.pipe(ofType(UsersApiActions.logout))),
          map((task: Task) =>
            TasksApiActions['updateTask-Success']({ updatedTask: task })
          ),
          catchError((error: { message: string }) =>
            of(TasksApiActions['updateTask-Error']({ err: error.message }))
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksApiActions.createTask),
      withLatestFrom(this.store.select('user')),
      switchMap(([{ newTask }, user]) => {
        if (!user.loggedIn) {
          return of(
            TasksApiActions['createTask-Error']({ err: 'User is logged out' })
          );
        }
        return this.tasksService.createTask(newTask).pipe(
          takeUntil(this.actions$.pipe(ofType(UsersApiActions.logout))),
          map((task: Task | null) => {
            if (task) {
              return TasksApiActions['createTask-Success']({ newTask: task });
            } else {
              return TasksApiActions['createTask-Error']({
                err: 'Error creating new task',
              });
            }
          }),
          catchError((err) => {
            return of(TasksApiActions['createTask-Error']({ err }));
          })
        );
      })
    )
  );

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.loadTasks),
      takeUntil(this.actions$.pipe(ofType(UsersApiActions.logout))),
      switchMap(() =>
        this.tasksService.getTasksByUserId().pipe(
          map((tasks: Task[]) =>
            TasksApiActions['tasksLoaded-Success']({ tasks })
          ),
          catchError((error: { message: string }) =>
            of(TasksApiActions['tasksLoaded-Error']({ err: error.message }))
          )
        )
      )
    );
  });

  constructor() {
    this.actions$.pipe(ofType(UsersApiActions.logout)).subscribe(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }
}
