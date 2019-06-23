import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/Tag';
import {apiBaseUrl} from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(apiBaseUrl + '/tag/all');
  }

  createTag(name: string, description: string): Observable<Tag> {
    return this.http.post<Tag>(apiBaseUrl + '/tag/create', {name, description});
  }
}
