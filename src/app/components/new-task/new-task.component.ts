import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewTask, Task } from '../../interfaces/task.model';
import { TasksApiActions } from '../../state/actions/tasks.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private store = inject(Store<ReadonlyArray<Task>>);
  private router = inject(Router);
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
