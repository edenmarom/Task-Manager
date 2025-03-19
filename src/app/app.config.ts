import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import routeConfig from './routes';
import { provideStore } from '@ngrx/store';
import { tasksReducer } from './state/reducers/tasks.reducer';
import { taskCollectionReducer } from './state/reducers/task-collection.reducer';
import { userReducer } from './state/reducers/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TasksEffect } from './state/effects/tasks.effects';
import { provideEffects } from '@ngrx/effects';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    provideClientHydration(withEventReplay()),
    provideStore({
      tasks: tasksReducer,
      taskCollection: taskCollectionReducer,
      user: userReducer,
    }),
    provideEffects(TasksEffect),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
