import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NewTask, Task } from '../interfaces/task.model';
import { Store } from '@ngrx/store';
import { UserAuthData } from '../interfaces/user.model';
import { selectUserAuthData } from '../state/selectors/user.selectors';
import { TaskManagerState } from '../state/reducers/task-manager-state';

export const TASKS_API_BASE_URL = 'http://localhost:3000/tasks/';


@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}
  private store = inject(Store<TaskManagerState>);
  getTasksUrl = TASKS_API_BASE_URL + 'getAllTasks';
  getTasksByUserIdUrl = TASKS_API_BASE_URL + 'getTasksByUserId/';
  deleteTaskUrl = TASKS_API_BASE_URL + 'deleteTask/';
  updateTaskUrl = TASKS_API_BASE_URL + 'updateTask/';
  createTaskUrl = TASKS_API_BASE_URL + 'createTask/';

  getTasksByUserId(): Observable<Array<Task>> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.userId) {
          const url = `${this.getTasksByUserIdUrl}${data.userId}`;
          return this.http.get<Task[]>(url).pipe(
            map((tasks) => tasks || []),
            catchError((error) => {
              console.error('Error fetching tasks');
              return throwError(() => error);
            })
          );
        } else {
          console.info('User is logged out, not fetching tasks.');
          return of([]);
        }
      })
    );
  }

  deleteTask(taskId: string): Observable<Object | null> {
    const url = `${this.deleteTaskUrl}${taskId}`;
    return this.http.delete(url).pipe(
      map((task) => task),
      catchError((error) => {
        console.error('Error deleting task');
        return throwError(() => error);
      })
    );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const url = `${this.updateTaskUrl}${updatedTask._id}`;
    const { _id, __v, ...updatedTaskData } = updatedTask;
    return this.http.put<Task>(url, updatedTaskData);
  }

  createTask(newTask: NewTask): Observable<Task | null> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.userId) {
          const newTaskWithUserId = {
            ...newTask,
            userId: data.userId,
          };
          return this.http
            .post<Task>(this.createTaskUrl, newTaskWithUserId)
            .pipe(
              map((task) => task),
              catchError((error) => {
                console.error('Error creating new task:', error);
                return throwError(() => error);
              })
            );
        } else {
          console.info('User is logged out, task creation prevented.');
          return of(null);
        }
      })
    );
  }
}