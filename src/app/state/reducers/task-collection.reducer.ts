import { createReducer, on } from '@ngrx/store';
import { TasksActions } from '../actions/tasks.actions';

export const initialState: ReadonlyArray<string> = [];

export const taskCollectionReducer = createReducer(
  initialState,
  on(TasksActions.removeTask, (state, { taskId }) =>
    state.filter((id) => id !== taskId)
  ),
  on(TasksActions.addTask, (state, { taskId }) => {
    if (state.indexOf(taskId) > -1) return state;

    return [...state, taskId];
  })
);
