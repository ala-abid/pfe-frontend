import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/Question';
import {Answer} from '../../models/Answer';
import {FormControl, Validators} from '@angular/forms';
import {Reply} from '../../models/Reply';
import {VoteQ} from '../../models/VoteQ';

class AnswerVote {
  currentUserVote: string;
  totalVotes: number;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  qId = -1;
  q: Question;
  answerCtrl = new FormControl('', Validators.required);
  replyToAnswerNo = -1;
  replyCtrl = new FormControl('', Validators.required);
  currentVote: VoteQ;
  totalVotes: number;
  answerVotes = new Array<AnswerVote>();

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {
  }

  ngOnInit() {
    this.qId = +this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(this.qId)
      .subscribe(
        (data) => {
          this.q = data;
          this.questionService.getVoteForCurrentUser(this.qId)
            .subscribe(
              value => {
                this.currentVote = value;
                this.getTotalVotes();
              },
              error1 => {
                console.log(error1);
              }
            );
          this.q.answers.forEach((answer, index) => {
            let answerVote = null;
            this.questionService.getTotalNoOfVotesAnswer(answer.id)
              .subscribe(
                (value: number) => {
                  if (answerVote === null) answerVote = new AnswerVote();
                  answerVote.totalVotes = value;
                  this.answerVotes[index] = answerVote;
                },
                error1 => console.log(error1)
              );
            this.questionService.getVoteForCurrentUserAnswer(answer.id).subscribe(
              (value: VoteQ) => {
                if (answerVote === null) answerVote = new AnswerVote();
                answerVote.currentUserVote = value.upDown;
                this.answerVotes[index] = answerVote;
              },
              error1 => console.log(error1)
            );
          });
        },
        (err) => console.log(err)
      );
  }

  showReply(myIndex: number) {
    if (this.replyToAnswerNo === myIndex) {
      this.replyToAnswerNo = -1;
    } else {
      this.replyToAnswerNo = myIndex;
    }
    this.replyCtrl.reset('');
  }

  addAnswer() {
    const a = new Answer();
    a.txt = this.answerCtrl.value;
    this.questionService.addAnswer(this.qId, a).subscribe(
      (data: Question) => {
        this.q = data;
        this.answerVotes.push(new AnswerVote());
      },
      (err: any) => {
        console.log('ERROR ERROR');
      }
    );
  }

  addReply(aId: number) {
    const r = new Reply();
    r.txt = this.replyCtrl.value;
    this.questionService.addReply(aId, r).subscribe(
      (data: Question) => {
        this.q = data;
      },
      (err: any) => {
        console.log('Reply err');
      }
    );
  }

  vote(upOrDown: string) {
    this.questionService.vote(this.qId, upOrDown).subscribe(
      value => {
        this.currentVote = value;
        this.getTotalVotes();
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  getTotalVotes() {
    this.questionService.getTotalNoOfVotes(this.qId).subscribe(
      (value: number) => {
        this.totalVotes = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  voteAnswer(answerId: number, upOrDown: string, index: number) {
    this.questionService.voteAnswer(answerId, upOrDown).subscribe(
      value => {
        this.answerVotes[index].currentUserVote = value.upDown;
        this.getTotalVotesAnswer(answerId, index);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  getTotalVotesAnswer(answerId: number, index: number) {
    this.questionService.getTotalNoOfVotesAnswer(answerId).subscribe(
      (value: number) => {
        this.answerVotes[index].totalVotes = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}
