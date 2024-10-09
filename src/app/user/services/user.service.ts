import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:4000';
  constructor(private http: HttpClient) {}
  getUser(): Observable<User> {
    // Add your code here
    return this.http.get<User>(`${this.url}/users/ `);
  }
}
