import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UsersApiActions } from '../actions/user.actions';
import { tasksReducer } from './tasks.reducer';
import { taskCollectionReducer } from './task-collection.reducer';
import { userReducer } from './user.reducer';

export interface State {
  tasks: any;
  taskCollection: any;
  user: any;
}

export const reducers: ActionReducerMap<State> = {
  tasks: tasksReducer,
  taskCollection: taskCollectionReducer,
  user: userReducer,
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === UsersApiActions['logout-Success'].type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
