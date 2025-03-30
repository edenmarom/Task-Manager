import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TasksApiActions } from '../../state/actions/tasks.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskManagerState } from '../../state/reducers/task-manager-state';
import { selectIsLoggedIn } from '../../state/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { NewTask, Task } from '../../interfaces/task.model';

interface NewTaskForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<string | null>;
}

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnInit {
  private store = inject(Store<TaskManagerState>);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  newTaskForm!: FormGroup<NewTaskForm>;

  ngOnInit() {
    this.newTaskForm = this.fb.group<NewTaskForm>({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('To Do', Validators.required),
    });
  }

  get title() {
    return this.newTaskForm.get('title');
  }

  get description() {
    return this.newTaskForm.get('description');
  }

  get status() {
    return this.newTaskForm.get('status');
  }

  addTask() {
    if (this.newTaskForm.valid) {
      const newTask: NewTask = {
        title: this.newTaskForm.value.title ?? undefined,
        description: this.newTaskForm.value.description ?? undefined,
        status: this.newTaskForm.value.status ?? undefined,
      };
      this.store.dispatch(TasksApiActions.createTask({ newTask }));
      this.router.navigate(['/tasks']);
    }
  }
}
