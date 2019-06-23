import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/Tag';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  constructor(private tagServcie: TagService, public dialog: MatDialog) { }

  ngOnInit() {
    this.tagServcie.getAllTags().subscribe(
      (value: Tag[]) => this.tags = value,
      error1 => console.log(this.tags)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTagDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.tagServcie.getAllTags().subscribe(
        (value: Tag[]) => this.tags = value,
        error1 => console.log(this.tags)
      );
    });
  }

}

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: 'add-tag-dialog.html',
})
export class AddTagDialogComponent {
  nameCtrl = new FormControl();
  descCtrl = new FormControl();
  constructor(public dialogRef: MatDialogRef<AddTagDialogComponent>, private tagService: TagService) {}
  createTag() {
    this.tagService.createTag(this.nameCtrl.value, this.descCtrl.value).subscribe(
      value => this.dialogRef.close(),
      error1 => console.error(error1)
    );
  }
}
