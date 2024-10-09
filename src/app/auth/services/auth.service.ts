import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, tap, map } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  private url = 'http://localhost:4000';

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    const token = this.sessionStorage.getToken();
    this.isAuthorized$$ = new BehaviorSubject<boolean>(!!token);
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }

  login(user: User) {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post(`${this.url}/login`, user).pipe(
      tap((res: any) => {
        this.sessionStorage.setToken(res.token);
        this.isAuthorized$$.next(true);
      })
    );
  }

  logout() {
    // Add your code here
    this.sessionStorage.deleteToken();
    this.isAuthorised = false;
    this.router.navigate(['/login']);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, user).pipe(
      map((res) => {
        if (res.successful) {
          console.log(res.result);
        }
        return res;
      })
    );
  }

  private hasToken(): boolean {
    const token = this.sessionStorage.getToken();
    return !!token;
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
    return '/login';
  }
}
