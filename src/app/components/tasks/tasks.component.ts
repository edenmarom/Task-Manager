import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, TaskComponent, FormsModule],
  providers: [TasksService],
})
export class TasksComponent {
  private store = inject(Store<ReadonlyArray<Task>>);
  tasksService: TasksService = inject(TasksService);
  selectedTask: Task | null = null;
  isEditModalOpen: boolean = false;

  tasks$: Observable<readonly Task[]> = this.store.select(selectTasks);
  toDoTasks$: Observable<readonly Task[]> = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'To Do'))
  );
  inProgressTasks$: Observable<readonly Task[]> = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'In Progress'))
  );
  doneTasks$: Observable<readonly Task[]> = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'Done'))
  );

  ngOnInit() {
    this.store.dispatch(TasksApiActions.loadTasks());
  }

  openEditModal(task: Task) {
    this.selectedTask = { ...task };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedTask = null;
  }

  saveEditedTask() {
    if (this.selectedTask) {
      this.store.dispatch(
        TasksApiActions.updateTask({ updatedTask: this.selectedTask })
      );
      this.closeEditModal();
    }
  }

  editTask(task: Task) {
    this.openEditModal(task);
  }

  deleteTask(task: Task) {
    this.store.dispatch(TasksApiActions.deleteTask({ taskId: task._id }));
  }
}
