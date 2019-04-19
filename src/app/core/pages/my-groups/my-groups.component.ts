import { Component, OnInit } from '@angular/core';
import {Group} from '../../models/Group';
import {UserService} from '../../services/user.service';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';


export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 1000,
  position: 'right'
};


@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})
export class MyGroupsComponent implements OnInit {

  managedGroups: Group[];
  memberOfGroups: Group[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getGroupsMemberOf().subscribe(
      value => {
        this.memberOfGroups = value;
      },
      error1 => {
        console.log(error1);
      }
    );
    this.userService.getManagedGroups().subscribe(
      value => {
        this.managedGroups = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}
