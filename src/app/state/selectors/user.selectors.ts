import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../interfaces/user.model';

export const selectUser = createFeatureSelector<User>('user');

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: User | undefined) => user?.loggedIn || false
);
