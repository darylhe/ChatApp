import { Injectable } from '@angular/core';
import { User } from './user';
import { BASE_URL } from './constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User();

  constructor(private httpClient: HttpClient) {
    this.user = new User();
  }

  queryUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(BASE_URL + '/login', user);
  }

  allUser() {
    return this.httpClient
      .get<User[]>(BASE_URL + '/user');
  }

  addUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(BASE_URL + '/user', user);
  }

  deleteUser(user: User): Observable<HttpResponse<string>> {
    return this.httpClient
      .request<string>(
        'delete',
        BASE_URL + '/user',
        {
          body: user,
          observe: 'response',
        }
      );
  }

  updateUser(user: User): Observable<HttpResponse<string>> {
    return this.httpClient
      .request<string>(
        'put',
        BASE_URL + '/user',
        {
          body: user,
          observe: 'response',
        }
      );
  }
}
