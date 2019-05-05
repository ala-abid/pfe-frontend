import { Injectable } from '@angular/core';
import {VisitedPage} from '../models/VisitedPage';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  lastVisited: VisitedPage[] = [];
  constructor() { }
  addToHistory(visitedPage: VisitedPage) {
    for (let i = 0; i < this.lastVisited.length; i++) {
      if (this.lastVisited[i].url === visitedPage.url) this.lastVisited.splice(i, 1);
    }
    this.lastVisited.unshift(visitedPage);
  }
}
