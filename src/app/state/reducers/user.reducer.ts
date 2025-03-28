import { createReducer, on } from '@ngrx/store';
import { UsersApiActions } from '../actions/user.actions';
import { User } from '../../interfaces/user.model';

export const userInitialState: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  dob: "",
  imgUrl: "",
  token: "",
  loggedIn: false,
};

export const userReducer = createReducer(
  userInitialState,
  on(UsersApiActions['signup-Success'], (state, { userId, token }) => ({
    ...state,
    id: userId,
    token: token,
    loggedIn: true,
  })),
  on(UsersApiActions['login-Success'], (state, { userId, token }) => ({
    ...state,
    id: userId,
    token: token,
    loggedIn: true,
  })),
  on(UsersApiActions.logout, (state) => userInitialState)
);
