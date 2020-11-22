import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';

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
    return this.http.get(this.SERVER_URL + '/users', {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  addUser(user: User) {
    // console.log('http post', user);
    return this.http.post(
      this.SERVER_URL + '/users',
      user,
      {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
      .toPromise();
  }
}

