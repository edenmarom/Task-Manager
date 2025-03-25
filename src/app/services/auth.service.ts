import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, UserCredentials } from '../interfaces/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000/auth/';
  signupUrl = this.baseUrl + 'signup';
  loginUrl = this.baseUrl + 'login';

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.authRequest(email, password, this.signupUrl);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.authRequest(email, password, this.loginUrl);
  }

  private authRequest(email: string, password: string, url: string) {
    const credentials: UserCredentials = {
      email: email,
      password: password,
    };
    return this.http.post<AuthResponse>(url, credentials);
  }
}
