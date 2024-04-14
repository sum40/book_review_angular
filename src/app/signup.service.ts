import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupInterface } from './signup-interface';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private baseUrl = 'http://localhost:3000/register';

  constructor(private httpClient: HttpClient) {}

  getAlluser(): Observable<SignupInterface[]> {
    return this.httpClient.get<SignupInterface[]>(this.baseUrl);
  }

  onSubmit(user: SignupInterface) {
    return this.httpClient.post(this.baseUrl, user);
  }
}
