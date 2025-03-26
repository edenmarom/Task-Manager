import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    Logout: emptyProps(),
  },
});

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
    'Logout - Success': emptyProps(),
    'Logout - Error': props<{ err: string }>(),
  },
});
