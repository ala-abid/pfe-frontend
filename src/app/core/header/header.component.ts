import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {loginPath, registerPath, tokenKey} from '../../AppConstants';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {JiraService} from '../services/jira.service';
import {Subscription} from 'rxjs';
import {QuestionService} from '../services/question.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  myControl = new FormControl('');
  options: [string[]];
  forumSearchOptions: any[];
  jiraSubscription: Subscription;
  forumSearchSubscription: Subscription;
  constructor(private storageService: LocalStorageService, protected router: Router, private jiraService: JiraService, private questionService: QuestionService) {

  }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(value => {
      if (value === '') {
        this.options = [[]];
        this.forumSearchOptions = [];
      }
      if ( this.jiraSubscription ) {
        this.jiraSubscription.unsubscribe();
      }
      this.jiraSubscription = this.jiraService.searchForIssues(value).subscribe(
        (value1: any) => {
          this.options = value1;
        },
        error1 => {
          console.log(error1);
        }
      );
      if ( this.forumSearchSubscription ) {
        this.forumSearchSubscription.unsubscribe();
      }
      this.forumSearchSubscription = this.questionService.searchForQuestion(value).subscribe(
        (value1: any) => {
          this.forumSearchOptions = value1;
          console.log(value1);
        },
        error1 => {
          console.log(error1);
        }
      );

    });
  }

  logOut() {
    this.storageService.delete(tokenKey);
  }

  showBar() {
    return this.router.url !== loginPath && this.router.url !== registerPath;
  }

}
