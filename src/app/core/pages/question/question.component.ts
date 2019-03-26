import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  qId = '-1';
  q: Question;
  replyToAnswerNo = -1;
  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit() {
    this.qId = this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(this.qId).subscribe(
      (data) => {this.q = data; console.log(data)},
      (err) => console.log(err)
    );
  }

  showReply(myIndex: number) {
    if (this.replyToAnswerNo === myIndex) {
      this.replyToAnswerNo = -1;
    } else {
      this.replyToAnswerNo = myIndex;
    }
    console.log(this.replyToAnswerNo);
  }
}
