import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewTask } from '../../interfaces/task.model';
import { TasksApiActions } from '../../state/actions/tasks.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskManagerState } from '../../state/reducers/task-manager-state';
import { selectIsLoggedIn } from '../../state/selectors/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private store = inject(Store<TaskManagerState>);
  private router = inject(Router);
  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  newTask: NewTask = {
    title: '',
    description: '',
    status: 'To Do',
  };

  addTask() {
    this.store.dispatch(TasksApiActions.createTask({ newTask: this.newTask }));
    this.router.navigate(['/tasks']);
  }
}
