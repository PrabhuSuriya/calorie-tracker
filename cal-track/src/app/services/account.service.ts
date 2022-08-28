import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  token: string;
  user!: User;
  private API_BASE: string;
  userUpdated$ = new BehaviorSubject<User>(null as unknown as User);

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') as string;
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.userUpdated$.next(this.user);
    }
    this.API_BASE = `${environment.API_BASE}/auth`;
  }

  private updateUser(user: User) {
    this.user = user;
    this.token = user.token;
    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userUpdated$.next(user);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.API_BASE}/login`, { email, password })
      .pipe(
        tap((data) => {
          this.updateUser(data);
        })
      );
  }
}
