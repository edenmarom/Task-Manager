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
  on(UsersApiActions['getUserData-Success'], (state, { user }) => {
    if (
      state.name === user.name &&
      state.email === user.email &&
      state.phone === user.phone &&
      state.dob === user.dob &&
      state.imgUrl === user.imgUrl
    ) {
      return state;
    }
    return {
      ...state,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      imgUrl: user.imgUrl,
    };
  }),
  on(UsersApiActions['updateUser-Success'], (state, { updatedUser }) => {
    const newState = {
      ...state,
      name: updatedUser.name ?? state.name,
      email: updatedUser.email ?? state.email,
      phone: updatedUser.phone ?? state.phone,
      dob: updatedUser.dob ?? state.dob,
      imgUrl: updatedUser.imgUrl ?? state.imgUrl,
    };
    if (JSON.stringify(newState) === JSON.stringify(state)) {
      return state;
    }
    return newState;
  }),
  on(UsersApiActions.logout, (state) => userInitialState)
);
