import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../interfaces/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Add User': props<{ userId: string }>(),
    'Remove User': props<{ userId: string }>(),
  },
});

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Retrieved User List': props<{ users: ReadonlyArray<User> }>(),
  },
});
