import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  login(data: LoginRequest){
    return this.http.post<LoginResponse>('https://reqres.in/api/login', data);
  }
}
