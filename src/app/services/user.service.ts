import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as AppUtil from '../common/app.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createAccount(user ) {
    return this.http.post('http://localhost:5000/users/register', user, {headers : {"content-type":"application/json"}});
    // .pipe(map((res: Response) => res.json()));
  }
  login(user) {
    return this.http.post('http://localhost:5000/users/login', user , {headers : {"content-type":"application/json"}})
  // .pipe(map((res: Response) => res.json()));
  }

  saveUserDate(token, user) {
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }

  logOut() {
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(AppUtil.USER_INFO));
  }
}
