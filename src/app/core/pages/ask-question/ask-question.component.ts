import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {startWith} from 'rxjs/internal/operators/startWith';
import {debounceTime, map} from 'rxjs/operators';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/Tag';
import {QuestionService} from '../../services/question.service';
import {Router} from '@angular/router';
import {Group} from '../../models/Group';
import {UserService} from '../../services/user.service';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  titleCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  txtCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Elastic', 'Java', 'RFP', 'Palmyra', 'Solife'];
  GrpCtrl = new FormControl('', Validators.required);
  groupsMemberOf: Group[] = [];
  suggestedTags: {name: string}[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('titleTag') titleTag: ElementRef;
  @ViewChild('txtTag') txtTag: ElementRef;

  toggleChecked = true;

  constructor(private tagService: TagService, private questionService: QuestionService,
              private router: Router, private usrService: UserService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }
  ngOnInit() {

    fromEvent(this.titleTag.nativeElement, 'input').pipe()
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        console.log('STOPPED ' + data);
        this.questionService.getSuggestedTags(data.toString() === '' ? 'a' : data.toString(),
          this.txtTag.nativeElement.value  === '' ? 'a' : this.txtTag.nativeElement.value).subscribe(
          (value: {name: string} []) => this.suggestedTags = value
        );
      });

    fromEvent(this.txtTag.nativeElement, 'input').pipe()
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        this.questionService.getSuggestedTags(this.titleTag.nativeElement.value === '' ? 'a' : this.titleTag.nativeElement.value,
          data.toString() === '' ? 'a' : data.toString()).subscribe(
          (value: {name: string} []) => this.suggestedTags = value
        );
        console.log('STOPPED ' + data);
      });


    this.GrpCtrl.disable();
    this.tagService.getAllTags().subscribe(
      (data: Tag[]) => {
        this.allTags = data.map(t => t.name);
        this.tagCtrl.setValue(null);
      }
    );
    this.usrService.getGroupsMemberOf().subscribe(
      value => this.groupsMemberOf = value,
      error1 => console.log(error1)
    );
  }

  /*add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }*/

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    // <------ add it back to the allTags array
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.allTags.push(tag);  // <---- This was added
      this.tagCtrl.setValue(null); // <---- This was added
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.allTags.splice(this.allTags.indexOf(event.option.viewValue), 1); // <---- This was added
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  addFromRecommended(tag: string) {
    if (this.tags.indexOf(tag) < 0) {
      this.tags.push(tag);
      this.allTags.splice(this.allTags.indexOf(tag), 1); // <---- This was added
      this.tagCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  createQuestion() {
    this.questionService.createQuestion(this.tags, this.titleCtrl.value.toString(), this.txtCtrl.value.toString(),
      this.toggleChecked ? 1 : this.GrpCtrl.value)
      .subscribe((value: any) => {
        this.router.navigateByUrl('question/' + value.id);
      },
      err => {
        console.log(err);
      });
  }

  changeToggleCheckedState() {
    if ( this.toggleChecked) {
      this.toggleChecked = false;
      this.GrpCtrl.enable();
    } else {
      this.toggleChecked = true;
      this.GrpCtrl.disable();
    }

  }


}
