import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewTaskComponent } from './components/new-task/new-task.component';

const routeConfig: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Task Manager',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Task Manager',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    title: 'Task Manager',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Task Manager',
  },
  {
    path: 'new-task',
    component: NewTaskComponent,
    title: 'Task Manager',
  },
];

export default routeConfig;
