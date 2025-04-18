import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import routeConfig from './routes';
import { provideStore } from '@ngrx/store';
import { tasksReducer } from './state/reducers/tasks.reducer';
import { userReducer } from './state/reducers/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TasksEffect } from './state/effects/tasks.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthEffect } from './state/effects/auth.effects';
import { UserEffect } from './state/effects/user.effects';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      tasks: tasksReducer,
      user: userReducer,
    }),
    provideEffects(TasksEffect, AuthEffect, UserEffect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
