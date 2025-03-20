import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../interfaces/task.model';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Add Task': props<{ taskId: string }>(),
    'Remove Task': props<{ taskId: string }>(),
  },
});

export const TasksApiActions = createActionGroup({
  source: 'Tasks API',
  events: {
    'Load Tasks': emptyProps(),
    'Tasks Loaded - Success': props<{ tasks: ReadonlyArray<Task> }>(),
    'Tasks Loaded - Error': props<{ err: string }>(),
    'Delete Task': props<{ taskId: string }>(),
    'Delete Task - Success': props<{ taskId: string }>(),
    'Delete Task - Error': props<{ err: string }>(),
    'Update Task': props<{ updatedTask: Task }>(),
    'Update Task - Success': props<{ updatedTask: Task }>(),
    'Update Task - Error': props<{ err: string }>(),
    'Create Task': props<{ newTask: Task }>(),
    'Create Task - Success': props<{ newTask: Task }>(),
    'Create Task - Error': props<{ err: string }>(),
  },
});
