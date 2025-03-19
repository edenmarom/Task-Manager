import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
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
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details Page',
  },
];

export default routeConfig;
