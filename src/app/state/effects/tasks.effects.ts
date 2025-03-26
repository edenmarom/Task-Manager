import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import { TasksApiActions } from '../actions/tasks.actions';
import { Task } from '../../interfaces/task.model';

@Injectable()
export class TasksEffect {
  private actions$: Actions = inject(Actions);
  private tasksService: TasksService = inject(TasksService);

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksApiActions.deleteTask),
      switchMap(({ taskId }) =>
        this.tasksService.deleteTask(taskId).pipe(
          map((task: Task) =>
            TasksApiActions['deleteTask-Success']({ taskId: task._id })
          ),
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
      switchMap(({ newTask }) =>
        this.tasksService.createTask(newTask).pipe(
          map((task: Task) =>
            TasksApiActions['createTask-Success']({ newTask: task })
          ),
          catchError((error: { message: string }) =>
            of(TasksApiActions['createTask-Error']({ err: error.message }))
          )
        )
      )
    )
  );

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.loadTasks),
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
}
