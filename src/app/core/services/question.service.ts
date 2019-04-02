import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiAllQsPath, apiBaseUrl} from '../../AppConstants';
import {Observable} from 'rxjs';
import {Question} from '../models/Question';
import {Answer} from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(apiBaseUrl + apiAllQsPath);
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(apiBaseUrl + '/question/' + id);
  }

  addAsnwer(qId: string, content: Answer) {
    return this.http.post(apiBaseUrl + '/question/' + qId + '/addAnswer', content);
  }

}
