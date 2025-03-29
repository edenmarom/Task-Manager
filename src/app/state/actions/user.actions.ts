import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../interfaces/user.model';

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    "Signup": props<{ email: string; password: string }>(),
    'Signup - Success': props<{ userId: string; token: string }>(),
    'Signup - Error': props<{ err: string }>(),
    "Login": props<{ email: string; password: string }>(),
    'Login - Success': props<{ userId: string; token: string }>(),
    'Login - Error': props<{ err: string }>(),
    "Logout": emptyProps(),
    "GetUserData": emptyProps(),
    'GetUserData - Success': props<{ user: User }>(),
    'GetUserData - Error': props<{ err: string }>(),
    'Update User': props<{ updatedUser: Partial<User> }>(),
    'Update User - Success': props<{ updatedUser: User }>(),
    'Update User - Error': props<{ err: string }>(),
  },
});
