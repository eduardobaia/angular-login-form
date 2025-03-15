import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/LoginResponse.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  apiUrl: string="http://localhost:8080/auth";
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + "/login", { email, password })
      .pipe(
        tap((value) => {
          localStorage.setItem('token', value.token);
          localStorage.setItem('name', value.name);
          return value;
        })
      );
  }

  signup(name: string, email:string, password: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + "/register", { name,email, password })
      .pipe(
        tap((value) => {
          localStorage.setItem('token', value.token);
          localStorage.setItem('name', value.name);
          return value;
        })
      );
  }
}
