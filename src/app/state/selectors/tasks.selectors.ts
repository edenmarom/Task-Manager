import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from '../../interfaces/task.model';

export const selectTasks = createFeatureSelector<ReadonlyArray<Task>>('tasks');

export const selectTaskCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('taskCollection');

export const selectTaskCollection = createSelector(
  selectTasks,
  selectTaskCollectionState,
  (tasks, collection) => {
    return collection.map((id) => tasks.find((task) => task._id === id)!);
  }
);
