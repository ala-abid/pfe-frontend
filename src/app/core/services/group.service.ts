import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiBaseUrl} from '../../AppConstants';
import {Observable} from 'rxjs';
import {Group} from '../models/Group';
import {Question} from '../models/Question';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroupInfo(groupId: number): Observable<Group> {
    return this.http.get<Group>(apiBaseUrl + '/group/' + groupId);
  }

  getGroupQuestions(groupId: number): Observable<Question[]> {
    return this.http.get<Question[]>(apiBaseUrl + '/group/' + groupId + '/getQuestions');
  }

  getGroupUsers(groupId: number): Observable<User[]> {
    return this.http.get<User[]>(apiBaseUrl + '/group/' + groupId + '/getUsers');
  }

  addUser(groupId: number, userId: number) {
    return this.http.get(apiBaseUrl + '/group/' + groupId + '/addUser/' + userId);
  }

  createGroup(name: string, description: string) {
    return this.http.get(apiBaseUrl + '/group/create/' + name + '/' + description);
  }

  removeUser(userId: number, groupId: number) {
    return this.http.delete(apiBaseUrl + '/group/' + groupId + '/deleteUser/' + userId);
  }

  makeAdmin(adminId: number, groupId: number) {
    return this.http.get(apiBaseUrl + '/group/' + groupId + '/addAdmin/' + adminId);
  }
  removeAdmin(adminId: number, groupId: number) {
    return this.http.delete(apiBaseUrl + '/group/' + groupId + '/deleteAdmin/' + adminId);
  }
}
