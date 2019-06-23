import {Component, Inject, OnInit} from '@angular/core';
import {Group} from '../../models/Group';
import {GroupService} from '../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../models/Question';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/internal/operators/startWith';
import {map} from 'rxjs/operators';
import {LocalStorageService} from '../../services/local-storage.service';


export interface DialogData {
  groupId: number;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit {

  group: Group;
  questions: Question[];
  groupId = -1;
  users: User[];
  admins: string[];

  constructor(private route: ActivatedRoute, private groupService: GroupService,
              private userService: UserService, private dialog: MatDialog, protected storageService: LocalStorageService) {
  }

  ngOnInit() {
    this.groupId = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroupInfo(this.groupId).subscribe(
      value => {
        this.group = value;
        this.admins = this.group.admins.map(admin => admin.username);
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

    this.groupService.getGroupUsers(this.groupId).subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px', data: {groupId: this.groupId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.groupService.getGroupUsers(this.groupId).subscribe(
        (data: User[]) => {
          this.users = data;
        },
        error1 => {
          console.log(error1);
        }
      );
      console.log('The dialog was closed');
    });
  }

  removeUser(id: number) {
    this.groupService.removeUser(id, this.groupId).subscribe(
      (value: Group) => this.users = value.users,
      error1 => console.log(error1)
    );
  }
  makeAdmin(userId, groupId){
    this.groupService.makeAdmin(userId, groupId).subscribe(
      (value: Group) => this.admins = value.admins.map(admin => admin.username),
      error1 => console.log(error1)
    );
  }
  removeAdmin(userId, groupId){
    this.groupService.removeAdmin(userId, groupId).subscribe(
      (value: Group) => this.admins = value.admins.map(admin => admin.username),
      error1 => console.log(error1)
    );
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  usersNotInGroup: User[] = [];
  usersNotInGroupNames: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService, private grpService: GroupService) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.userService.getUsersNotInGroup(this.data.groupId).subscribe(
      value => {
        this.usersNotInGroup = value;
        this.usersNotInGroupNames = this.usersNotInGroup.map(value1 => value1.username);
      },
      error1 => console.log(error1)
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.usersNotInGroupNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser() {
    let userId = 0;
    this.usersNotInGroup.forEach(value => {
      if (value.username === this.myControl.value.toString()) {
        userId = value.id;
      }
    });
    this.grpService.addUser(this.data.groupId, userId).subscribe(
      value => this.dialogRef.close(),
      error1 => this.dialogRef.close()
    );
  }

}
