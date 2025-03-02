import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {apiAllQsPath, apiBaseUrl, searchPrefs} from '../../AppConstants';
import {Observable} from 'rxjs';
import {Question} from '../models/Question';
import {Answer} from '../models/Answer';
import {Reply} from '../models/Reply';
import {VoteQ} from '../models/VoteQ';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(apiBaseUrl + apiAllQsPath);
  }
  getQuestionsPerCurrentUserTags(): Observable<Question[]> {
    return this.http.get<Question[]>(apiBaseUrl + '/question/perCurrentUserTags');
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(apiBaseUrl + '/question/' + id);
  }

  addAnswer(qId: number, content: Answer): Observable<Question> {
    return this.http.post<Question>(apiBaseUrl + '/question/' + qId + '/addAnswer', content);
  }

  createQuestion(tags: string[], title: string, txt: string, groupId: number) {
    return this.http.post(apiBaseUrl + '/question/create', {title, txt, tags, groupId});
  }

  addReply(aId: number, reply: Reply): Observable<Question> {
    return this.http.post<Question>(apiBaseUrl + '/question/answer/' + aId, reply);
  }

  searchForQuestion(query: string) {
    const x = this.storage.retrieve(searchPrefs);
    if ( x === 'Titles') return this.http.get(apiBaseUrl + '/api/test/search/' + query);
    if ( x === 'Contents') return this.http.get(apiBaseUrl + '/api/test/searchContent/' + query);
    return this.http.get(apiBaseUrl + '/api/test/searchAnswers/' + query);
  }

  vote(qId: number, upOrDown: string): Observable<VoteQ> {
    return this.http.get<VoteQ>(apiBaseUrl + '/vote/question/' + qId + '/' + upOrDown);
  }

  getVoteForCurrentUser(qId: number): Observable<VoteQ> {
    return this.http.get<VoteQ>(apiBaseUrl + '/vote/findByUserAndQuestion/' + qId);
  }

  getTotalNoOfVotes(qId: number) {
    return this.http.get(apiBaseUrl + '/vote/getTotal/' + qId);
  }

  voteAnswer(aId: number, upOrDown: string): Observable<VoteQ> {
    return this.http.get<VoteQ>(apiBaseUrl + '/vote/answer/' + aId + '/' + upOrDown);
  }

  getVoteForCurrentUserAnswer(aId: number): Observable<VoteQ> {
    return this.http.get<VoteQ>(apiBaseUrl + '/vote/findByUserAndAnswer/' + aId);
  }

  getTotalNoOfVotesAnswer(aId: number) {
    return this.http.get(apiBaseUrl + '/vote/getTotalAnswer/' + aId);
  }

  getRelatedQuestions(id: number) {
    return this.http.get(apiBaseUrl + '/moreLikeThis/' + id);
  }

  getSuggestedTags(title: string, txt: string | 'a') {
    return this.http.get(apiBaseUrl + '/es/getTagSuggestion/' + title + '/' + txt);
  }

  deleteQuestion(id: number) {
    return this.http.delete(apiBaseUrl + '/question/delete/' + id);
  }

  editQuestion(id: number, txt: string, title: string, tags: string[]){
    return this.http.post(apiBaseUrl + '/question/' + id + '/edit', {title, txt, tags});
  }

  getQuestionstagged(tagId: number): Observable<Question[]> {
    return this.http.get<Question[]>(apiBaseUrl + '/question/tagged/' + tagId);
  }

  markAnswerAsSolution(answerId: number): Observable<Question> {
    return this.http.get<Question>(apiBaseUrl + '/answer/' + answerId + '/markAsSolution');
  }

}
