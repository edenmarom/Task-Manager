import { createReducer, on } from '@ngrx/store';
import { TasksApiActions } from '../actions/tasks.actions';
import { Task } from '../../interfaces/task.model';
import { UsersApiActions } from '../actions/user.actions';

export const initialState: ReadonlyArray<Task> = [];


export const tasksReducer = createReducer(
  initialState,
  on(TasksApiActions['tasksLoaded-Success'], (_state, { tasks }) => tasks),
  on(TasksApiActions['deleteTask-Success'], (state, { taskId }) =>
    state.filter((task: Task) => task._id !== taskId)
  ),
  on(TasksApiActions['updateTask-Success'], (state, { updatedTask }) =>
    state.map((task: Task) => (task._id === updatedTask._id ? updatedTask : task))
  ),
  on(TasksApiActions['createTask-Success'], (state, { newTask }) => [
    ...state,
    newTask,
  ]),
  on(UsersApiActions.logout, (state) => (initialState))
);
