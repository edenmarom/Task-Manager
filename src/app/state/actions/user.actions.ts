import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../interfaces/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Add User': props<{ userId: string }>(),
    'Remove User': props<{ userId: string }>(),
  },
}); // TODO:check if needed

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    "Signup": props<{ email: string; password: string }>(),
    'Signup - Success': props<{ userId: string; token: string }>(),
    'Signup - Error': props<{ err: string }>(),
    "Login": props<{ email: string; password: string }>(),
    'Login - Success': props<{ userId: string; token: string }>(),
    'Login - Error': props<{ err: string }>(),
  },
});
