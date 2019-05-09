import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';
import {fromEvent, Observable} from 'rxjs';
import {Group} from '../../models/Group';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {TagService} from '../../services/tag.service';
import {QuestionService} from '../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {Tag} from '../../models/Tag';
import {Question} from '../../models/Question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  qId = -1;
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
  suggestedTags: {name: string}[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('titleTag') titleTag: ElementRef;
  @ViewChild('txtTag') txtTag: ElementRef;

  constructor(private tagService: TagService, private questionService: QuestionService,
              private router: Router, private usrService: UserService, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }
  ngOnInit() {
    this.qId = +this.route.snapshot.paramMap.get('id');
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
    this.tagService.getAllTags().subscribe(
      (data: Tag[]) => {
        this.allTags = data.map(t => t.name);
        this.tagCtrl.setValue(null);
      }
    );
    this.questionService.getQuestion(this.qId).subscribe(
      (data: Question) => {
        this.txtCtrl.setValue(data.txt);
        this.titleCtrl.setValue(data.title);
        this.tags = data.tags.map(t => t.name);
        this.tags.forEach(tag => {
          this.allTags.splice(this.allTags.indexOf(tag), 1);
        });
        this.tagCtrl.setValue(null);
      }
    )
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
    this.questionService.editQuestion(this.qId, this.txtCtrl.value, this.titleCtrl.value, this.tags).subscribe(
      value => this.router.navigateByUrl('/question/' + this.qId),
      error1 => console.log(error1)
    );
  }

  backToQuestion() {
    this.router.navigateByUrl('/question/' + this.qId);
  }
}
