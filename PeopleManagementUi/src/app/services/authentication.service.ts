import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';
import { Company } from '../models/company';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public httpClient: HttpClient, private router: Router) { }

  public isAuthentication(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public register(username : string, password : string, email : string, firstName : string, lastName : string): Observable<any> {

    const user: User = {
      username: username,
      password: password,
      email: email ,
      firstName: firstName,
      lastName: lastName,
      isConfirmed: false
  };

  return this.httpClient.post<User>(`${API_URL}/token/register`, user);
}

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/token/login`, { username, password });
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  confirmAccount(user: User): Observable<User> {
    return this.httpClient.post<any>(`${API_URL}/token/confirm/` + user.username, user);
  }

  redirectToLogin(): void {
    this.router.navigate(['auth/login']);
  }
  
}
