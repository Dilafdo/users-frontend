import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  /**
   * fetch all users from the server
   */
  getAllUsers() {
    return this.http.get(this.SERVER_URL + '/users', {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  /**
   * add a new user in user service
   *
   * @param user :user to be added
   */
  addUser(user: User) {
    return this.http.post(
      this.SERVER_URL + '/users',
      user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(
        catchError(err => throwError(err))
      );
  }

  /**
   * delete a user in user service
   *
   * @param id :user id of the user to delete
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.SERVER_URL + '/users/' + id, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  /**
   * retrieve a user by user id
   *
   * @param id : user id of the user to retrieve
   */
  getUser(id: string) {
    return this.http.get(this.SERVER_URL + '/users/' + id, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  /**
   * edit a user by Id
   *
   * @param id : user id of the user to edit
   * @param user : user entity of updated user
   */
  editUser(id: string, user: User): Observable<void> {
    return this.http.put<void>(this.SERVER_URL + '/users/' + id, user,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}

