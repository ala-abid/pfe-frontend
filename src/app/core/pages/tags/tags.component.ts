import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  constructor(private tagServcie: TagService) { }

  ngOnInit() {
    this.tagServcie.getAllTags().subscribe(
      (value: Tag[]) => this.tags = value,
      error1 => console.log(this.tags)
    );
  }

}
