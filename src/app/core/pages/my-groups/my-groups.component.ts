import { Component, OnInit } from '@angular/core';
import {Group} from '../../models/Group';
import {UserService} from '../../services/user.service';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatDialog, MatDialogRef, MatTooltipDefaultOptions} from '@angular/material';
import {GroupService} from '../../services/group.service';
import {FormControl} from '@angular/forms';


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

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getManaged();
    this.getMemebrOf();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog2);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getManaged();
      this.getMemebrOf();
    });
  }
  getMemebrOf() {
    this.userService.getGroupsMemberOf().subscribe(
      value => {
        this.memberOfGroups = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }
  getManaged() {
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

@Component({
  selector: 'dialog-content-example-dialog2',
  templateUrl: 'dialog-content-example-dialog2.html',
})
export class DialogContentExampleDialog2 {
  nameCtrl = new FormControl();
  descCtrl = new FormControl();
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog2>, private grpService: GroupService) {}
  createGrp() {
    this.grpService.createGroup(this.nameCtrl.value, this.descCtrl.value).subscribe(
    value => this.dialogRef.close(),
      error1 => console.log(error1)
    );
  }
}
