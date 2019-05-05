import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/Tag';
import {apiBaseUrl} from '../../AppConstants';
import {Question} from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(apiBaseUrl + '/tag/all');
  }

  getQuestionsPerTag(tagId: number) : Observable<Question[]> {
    return this.http.get<Question[]>(apiBaseUrl + 'tag/' + tagId + 'questions');
  }
}
