import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/Question';
import {Router} from '@angular/router';
import {VoteQ} from '../../models/VoteQ';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  currentVotes = new Array<number>();
  constructor( private questionService: QuestionService, private router: Router) {
  }
  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(
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
