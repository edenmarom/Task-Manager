import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../interfaces/task.model';
import { TasksService } from '../../services/tasks.service';
import { selectTasks } from '../../state/selectors/tasks.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

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
    // Implement edit logic here
  }

  deleteTask(task: any) {
    console.log('Delete task:', task);
    // this.tasks = this.tasks.filter((t) => t !== task);
    // this.toDoTasks = this.tasks.filter((task) => task.status === 'To Do');
    // this.inProgressTasks = this.tasks.filter(
    //   (task) => task.status === 'In Progress'
    // );
    // this.doneTasks = this.tasks.filter((task) => task.status === 'Done');
  }
}
