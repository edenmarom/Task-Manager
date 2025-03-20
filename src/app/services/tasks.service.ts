import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../interfaces/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/tasks/getAllTasks';
  
  getTasks(): Observable<Array<Task>> {
    return this.http.get<Task[]>(this.url).pipe(
      map((tasks) => {
        return tasks || [];
      })
    );
  }
}
