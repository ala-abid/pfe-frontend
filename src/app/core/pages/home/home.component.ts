import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/Question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  constructor( private questionService: QuestionService) {
  }
  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(
      data => { this.questions = data; },
      err => { console.log(err); }
    );
  }
}
