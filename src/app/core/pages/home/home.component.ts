import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/Question';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions: Question[];
  constructor( private questionService: QuestionService, private router: Router) {
  }
  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(
      data => { this.questions = data; },
      err => { console.log(err); }
    );
  }
}
