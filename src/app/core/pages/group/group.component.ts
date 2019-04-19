import { Component, OnInit } from '@angular/core';
import {Group} from '../../models/Group';
import {GroupService} from '../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../models/Question';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;
  questions: Question[];
  groupId = -1;
  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {
    this.groupId = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroupInfo(this.groupId).subscribe(
      value => {
        this.group = value;
      },
      error1 => {
        console.log(error1);
      }
    );

    this.groupService.getGroupQuestions(this.groupId).subscribe(
      value => {
        this.questions = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}
