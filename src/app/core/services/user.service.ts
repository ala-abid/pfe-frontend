import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {apiBaseUrl} from '../../AppConstants';
import {Group} from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(apiBaseUrl + '/user/all');
  }

  getManagedGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(apiBaseUrl + '/user/getGroupsAdmin');
  }

  getGroupsMemberOf(): Observable<Group[]> {
    return this.http.get<Group[]>(apiBaseUrl + '/user/getGroupsMember');
  }

  getCurrentUserInfo(): Observable<User> {
    return this.http.get<User>(apiBaseUrl + '/user/info');
  }

  saveSubscribedTags(tagIds: number[]){
    return this.http.post(apiBaseUrl + '/user/sub', tagIds);
  }

  getUsersNotInGroup(groupId: number): Observable<User[] >{
    return this.http.get<User[]>(apiBaseUrl + '/user/usersNotInGroup/' + groupId);
  }

}
