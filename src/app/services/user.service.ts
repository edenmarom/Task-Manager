import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User, UserAuthData } from '../interfaces/user.model';
import { Store } from '@ngrx/store';
import { TaskManagerState } from '../state/reducers/task-manager-state';
import { selectUserAuthData } from '../state/selectors/user.selectors';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  private store = inject(Store<TaskManagerState>);
  baseUrl = 'http://localhost:3000/user/';
  getUserDataUrl = this.baseUrl + 'getUserById/';
  updateUserUrl = this.baseUrl + 'updateUser/';

  getUserData(): Observable<User | null> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.userId && data.token) {
          const url = `${this.getUserDataUrl}${data.userId}`;
          const headers = new HttpHeaders({
            Authorization: data.token,
          });
          return this.http.get<User>(url, { headers }).pipe(
            map((user) => user || {}),
            catchError((error) => {
              console.error('Error fetching user data');
              return throwError(() => error);
            })
          );
        } else {
          console.info('User is logged out, not fetching user data.');
          return of(null);
        }
      })
    );
  }

  updateUser(updatedUser: Partial<User>): Observable<User> {
    return this.store.select(selectUserAuthData).pipe(
      switchMap((data: UserAuthData) => {
        if (data && data.token && data.userId) {
          const url = `${this.updateUserUrl}${data.userId}`;
          const headers = new HttpHeaders({
            Authorization: data.token,
          });
          return this.http.put<User>(url, updatedUser, { headers });
        } else {
          console.info('User is logged out, update user prevented.');
          return throwError(() => new Error('User is not authenticated'));
        }
      })
    );
  }
}
