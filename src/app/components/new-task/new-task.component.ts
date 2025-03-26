import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewTask, Task } from '../../interfaces/task.model';
import { TasksApiActions } from '../../state/actions/tasks.actions';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private store = inject(Store<ReadonlyArray<Task>>);
  private actions$ = inject(Actions);
  private router = inject(Router);
  newTask: NewTask = {
    title: '',
    description: '',
    status: 'To Do',
  };

  addTask() {
    console.log('🔹 addTask() called:', this.newTask);
    this.store.dispatch(TasksApiActions.createTask({ newTask: this.newTask }));
    this.actions$
      .pipe(ofType(TasksApiActions['createTask-Success']), take(1))
      .subscribe(() => {
        console.log('✅ Task successfully created!');
        this.newTask = {
          title: '',
          description: '',
          status: 'To Do',
        };
        this.router.navigate(['/tasks']);
      });
  }
}
