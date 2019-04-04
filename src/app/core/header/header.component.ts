import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {loginPath, registerPath, tokenKey} from '../../AppConstants';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {JiraService} from '../services/jira.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  myControl = new FormControl();
  options: [string[]];
  subscription: Subscription;
  constructor(private storageService: LocalStorageService, protected router: Router, private jiraService: JiraService) {

  }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(value => {
      if (value === '') this.options = [[]];
      if ( this.subscription ) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.jiraService.searchForIssues(value).subscribe(
        (value1: any) => {
          this.options = value1;
      },
        error1 => {
          console.log(error1);
        });
    });
  }

  logOut() {
    this.storageService.delete(tokenKey);
  }

  showBar() {
    return this.router.url !== loginPath && this.router.url !== registerPath;
  }

}
