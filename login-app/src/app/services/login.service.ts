import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/LoginResponse.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>('http://localhost:3000/login', { email, password })
      .pipe(
        tap((value) => {
          localStorage.setItem('token', value.token);
          localStorage.setItem('name', value.name);
          return value;
        })
      );
  }
}
