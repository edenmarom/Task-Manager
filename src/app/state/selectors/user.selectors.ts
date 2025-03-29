import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../interfaces/user.model';

export const selectUser = createFeatureSelector<User>('user');

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: User | undefined) => user?.loggedIn || false
);

export const selectUserAuthData = createSelector(
  selectUser,
  (user: User | undefined) => {
    return {
      userId: user?.id || '',
      token: user?.token || '',
    };
  }
);

export const selectProfileData = createSelector(
  selectUser,
  (user: User | undefined) => {
    if (!user || !user.email) {
      return null;
    }
    return {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dob: user?.dob || '',
      imgUrl: user?.imgUrl || '',
    };
  }
);
