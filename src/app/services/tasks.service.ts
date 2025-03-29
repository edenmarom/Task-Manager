import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NewTask, Task } from '../interfaces/task.model';
import { Store } from '@ngrx/store';
import { UserAuthData } from '../interfaces/user.model';
import { selectUserAuthData } from '../state/selectors/user.selectors';
import { TaskManagerState } from '../state/reducers/task-manager-state';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}
  private store = inject(Store<TaskManagerState>);
  baseUrl = 'http://localhost:3000/tasks/';
  getTasksUrl = this.baseUrl + 'getAllTasks';
  getTasksByUserIdUrl = this.baseUrl + 'getTasksByUserId/';
  deleteTaskUrl = this.baseUrl + 'deleteTask/';
  updateTaskUrl = this.baseUrl + 'updateTask/';
  createTaskUrl = this.baseUrl + 'createTask/';

  getTasksByUserId(): Observable<Array<Task>> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.userId && data.token) {
          const url = `${this.getTasksByUserIdUrl}${data.userId}`;
          const headers = new HttpHeaders({
            Authorization: data.token,
          });
          return this.http.get<Task[]>(url, { headers }).pipe(
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
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.userId && data.token) {
          const headers = new HttpHeaders({
            Authorization: data.token,
          });
          return this.http.delete(url, { headers }).pipe(
            map((task) => task),
            catchError((error) => {
              console.error('Error deleting task');
              return throwError(() => error);
            })
          );
        } else {
          console.info('User is logged out, not deleting task.');
          return of(null);
        }
      })
    );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.token) {
          const url = `${this.updateTaskUrl}${updatedTask._id}`;
          const headers = new HttpHeaders({
            Authorization: data.token,
          });
          const { _id, __v, ...updatedTaskData } = updatedTask;
          return this.http.put<Task>(url, updatedTaskData, { headers });
        } else {
          console.info('User is logged out, update task prevented.');
          return throwError(() => new Error('User is not authenticated'));
        }
      })
    );
  }

  createTask(newTask: NewTask): Observable<Task | null> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.userId && data.token) {
          const headers = new HttpHeaders({
            Authorization: data.token,
          });
          const newTaskWithUserId = {
            ...newTask,
            userId: data.userId,
          };
          return this.http
            .post<Task>(this.createTaskUrl, newTaskWithUserId, { headers })
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