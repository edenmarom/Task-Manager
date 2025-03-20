import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../interfaces/task.model';
import { TasksService } from '../../services/tasks.service';
import { selectTasks } from '../../state/selectors/tasks.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TasksApiActions } from '../../state/actions/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, TaskComponent],
  providers: [TasksService],
})
export class TasksComponent {
  private store = inject(Store<ReadonlyArray<Task>>);
  tasksService: TasksService = inject(TasksService);
  tasks: Observable<readonly Task[]> = this.store.select(selectTasks);
  toDoTasks: Observable<readonly Task[]> = this.tasks.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'To Do')));
  inProgressTasks: Observable<readonly Task[]> = this.tasks.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'In Progress')));
  doneTasks: Observable<readonly Task[]> = this.tasks.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'Done')));

  editTask(task: any) {
    console.log('Edit task:', task);
    this.store.dispatch(TasksApiActions.updateTask({updatedTask: task}));
  }

  deleteTask(task: Task) {
    this.store.dispatch(TasksApiActions.deleteTask({ taskId: task._id }));
  }
}
