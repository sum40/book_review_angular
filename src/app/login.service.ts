import { Injectable } from '@angular/core';
import { LoginInterface, LoginResponse } from './login-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/login';

  constructor(private httpClient: HttpClient) {}

  authUser(login: LoginInterface): Observable<LoginResponse> {
    return this.httpClient.post(this.baseUrl, login);
  }
  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
