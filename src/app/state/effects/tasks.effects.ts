import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
      tap(({ newTask }) =>
        console.log('🔹 createTask effect triggered:', newTask)
      ), 
      switchMap(({ newTask }) =>
        this.tasksService.createTask(newTask).pipe(
          map((task: Task | null) => {
            if (task) {
              console.log('✅ Task successfully created:', task);
              return TasksApiActions['createTask-Success']({ newTask: task });
            } else {
              console.log('❌ Task creation failed');
              return TasksApiActions['createTask-Error']({
                err: 'Error creating new task',
              });
            }
          }),
          catchError((error: { message: string }) => {
            console.error('❌ createTask error:', error);
            return of(
              TasksApiActions['createTask-Error']({
                err: error.message || 'Unknown error',
              })
            );
          })
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
