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

    loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(TasksApiActions.loadTasks),
        switchMap(() =>
            this.tasksService.getTasks().pipe(
                map((tasks: Task[]) => TasksApiActions['tasksLoaded-Success']({ tasks })),
                catchError((error: { message: string }) => 
                    of(TasksApiActions['tasksLoaded-Error']({ err: error.message })))
        )
    ));
})}
