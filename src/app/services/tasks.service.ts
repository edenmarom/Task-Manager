import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewTask, Task } from '../interfaces/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000/tasks/';
  getTasksUrl = this.baseUrl + 'getAllTasks';
  deleteTaskUrl = this.baseUrl + 'deleteTask/';
  updateTaskUrl = this.baseUrl + 'updateTask/';
  createTaskUrl = this.baseUrl + 'createTask/';

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Task[]>(this.getTasksUrl).pipe(
      map((tasks) => {
        return tasks || [];
      })
    );
  }

  deleteTask(taskId: string): Observable<any> {
    const url = `${this.deleteTaskUrl}${taskId}`;
    return this.http.delete(url);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const url = `${this.updateTaskUrl}${updatedTask._id}`;
    const { _id, __v, ...updatedTaskData } = updatedTask;
    return this.http.put<Task>(url, updatedTaskData);
  }

  createTask(newTask: NewTask): Observable<Task> {
    return this.http.post<Task>(this.createTaskUrl, newTask);
  }
}
