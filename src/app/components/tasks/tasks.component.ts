import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../interfaces/task.model';
import { TasksService } from '../../services/tasks.service';
import { TasksApiActions } from '../../state/actions/tasks.actions';
import { selectTaskCollection, selectTasks } from '../../state/selectors/tasks.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, TaskComponent, HttpClientModule],
  providers: [TasksService],
})
export class TasksComponent {
  // tasks = [
  //   { title: 'Task 1', description: 'Description 1', status: 'To Do' },
  //   { title: 'Task 2', description: 'Description 2', status: 'In Progress' },
  //   { title: 'Task 3', description: 'Description 3', status: 'Done' },
  //   { title: 'Task 4', description: 'Description 4', status: 'To Do' },
  //   { title: 'Task 5', description: 'Description 5', status: 'In Progress' },
  //   { title: 'Task 6', description: 'Description 6', status: 'Done' },
  //   { title: 'Task 4', description: 'Description 4', status: 'To Do' },
  //   { title: 'Task 5', description: 'Description 5', status: 'In Progress' },
  //   { title: 'Task 6', description: 'Description 6', status: 'Done' },
  //   { title: 'Task 4', description: 'Description 4', status: 'To Do' },
  //   { title: 'Task 5', description: 'Description 5', status: 'In Progress' },
  //   { title: 'Task 6', description: 'Description 6', status: 'Done' },
  // ];

  // toDoTasks = this.tasks.filter((task) => task.status === 'To Do');
  // inProgressTasks = this.tasks.filter((task) => task.status === 'In Progress');
  // doneTasks = this.tasks.filter((task) => task.status === 'Done');
  private store = inject(Store<ReadonlyArray<Task>>);
  tasksService: TasksService = inject(TasksService);
  tasks: Observable<readonly Task[]> = this.store.select(selectTasks);
  tasksCollection = this.store.select(selectTaskCollection);

  ngOnInit() {
    // this.tasksService
    //   .getTasks()
    //   .subscribe((tasks) =>
    //     this.store.dispatch(TasksApiActions.retrievedTaskList({ tasks }))
    //   );
  }

  constructor() {}

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
