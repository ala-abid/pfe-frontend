import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from '../models/Question';
import {Observable} from 'rxjs';
import {JiraIssue} from '../models/JiraIssue';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  constructor(private http: HttpClient) { }

  searchForIssues(str: string) {
    return this.http.get('http://localhost:8080/api/test/getSearchResults/' + str);
  }

  getIssue(issueKey: string): Observable<JiraIssue> {
    return this.http.get<JiraIssue>('http://localhost:8080/api/test/getJiraIssue/' + issueKey);
  }


}
