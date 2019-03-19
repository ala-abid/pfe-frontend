import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiBaseUrl, apiLoginPath, apiRegisterPath} from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string) {
    return this.http.post(apiBaseUrl + apiLoginPath, {usernameOrEmail, password});
  }

  register(name: string, username: string, email: string, password: string) {
    return this.http.post(apiBaseUrl + apiRegisterPath, {name, username, email, password})
  }
}
