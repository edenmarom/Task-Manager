import { createReducer, on } from '@ngrx/store';

import { TasksApiActions } from '../actions/tasks.actions';
import { Task } from '../../interfaces/task.model';

export const initialState: ReadonlyArray<Task> = [];

export const tasksReducer = createReducer(
  initialState,
  on(TasksApiActions['tasksLoaded-Success'], (_state, { tasks }) => tasks)
);
