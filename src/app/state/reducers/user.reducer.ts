import { createReducer, on } from '@ngrx/store';

import { UsersApiActions } from '../actions/user.actions';
import { User } from '../../interfaces/user.model';

export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  initialState,
  on(UsersApiActions.retrievedUserList, (_state, { users }) => users)
);
