import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginValue: any = new BehaviorSubject(false);

  APIENDPOINT = environment.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  login(data: userModel) {
    return this.http.post(`${this.APIENDPOINT}/auth/login`, data);
  }

  logOut(data: any) {
    return this.http.post(`${this.APIENDPOINT}/auth/logout`, data);
  }
  setLoginValue(value: boolean) {
    this.loginValue.next(value);
    localStorage.setItem('isLogin', JSON.stringify(value));
  }

  getLoginValue() {
     return this.loginValue;
  }

}
