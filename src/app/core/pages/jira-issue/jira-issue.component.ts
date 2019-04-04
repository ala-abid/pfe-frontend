import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JiraService} from '../../services/jira.service';
import {JiraIssue} from '../../models/JiraIssue';

@Component({
  selector: 'app-jira-issue',
  templateUrl: './jira-issue.component.html',
  styleUrls: ['./jira-issue.component.css']
})
export class JiraIssueComponent implements OnInit {

  private issueKey = '';
  private jiraIssue: JiraIssue;

  constructor(private route: ActivatedRoute, private jiraService: JiraService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.issueKey = this.route.snapshot.paramMap.get('id');
    this.jiraService.getIssue(this.issueKey).subscribe(
      (value: JiraIssue) => {
        this.jiraIssue = value;
      }
    );
  }

}
