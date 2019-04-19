import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiBaseUrl} from '../../AppConstants';
import {Observable} from 'rxjs';
import {Group} from '../models/Group';
import {Question} from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroupInfo(groupId: number): Observable<Group>{
    return this.http.get<Group>(apiBaseUrl + '/group/' + groupId);
  }

  getGroupQuestions(groupId: number): Observable<Question[]>{
    return this.http.get<Question[]>(apiBaseUrl+ '/group/' + groupId + '/getQuestions');
  }
}
