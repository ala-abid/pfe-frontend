import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/Question';
import {ActivatedRoute, Router} from '@angular/router';
import {VoteQ} from '../../models/VoteQ';
import {HistoryService} from '../../services/history.service';
import {VisitedPage} from '../../models/VisitedPage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  title = 'Home';
  currentVotes = new Array<number>();
  constructor( private questionService: QuestionService, private router: Router, private hist: HistoryService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    if (this.router.url.startsWith('/home')) {
      this.hist.addToHistory(new VisitedPage(this.router.url, 'Home'));
      this.questionService.getQuestionsPerCurrentUserTags().subscribe(
        data => {
          this.questions = data;
          this.questions.forEach(
            (value, index) => {
              this.questionService.getTotalNoOfVotes(value.id).subscribe(
                (value1: number) => {
                  this.currentVotes[index] = value1;
                }
                , error1 => console.log(error1)
              );
            }
          );
        },
        err => { console.log(err); }
      );
    } else {
      this.title = 'Questions tagged: ' + this.route.snapshot.paramMap.get('tagName');
      this.hist.addToHistory(new VisitedPage(this.router.url, this.title));
      this.questionService.getQuestionstagged(+this.route.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.questions = data;
          this.questions.forEach(
            (value, index) => {
              this.questionService.getTotalNoOfVotes(value.id).subscribe(
                (value1: number) => {
                  this.currentVotes[index] = value1;
                }
                , error1 => console.log(error1)
              );
            }
          );
        },
        err => { console.log(err); }
      );
    }
  }
}
