import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {TagService} from '../../services/tag.service';
import {Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {Tag} from '../../models/Tag';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {LocalStorageService} from '../../services/local-storage.service';
import {searchPrefs} from '../../../AppConstants';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  prefsCtrl = new FormControl(this.storageService.retrieve(searchPrefs));
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  arrOfTagType: Tag[];
  allTags: string[] = ['Elastic', 'Java', 'RFP', 'Palmyra', 'Solife'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private tagService: TagService, private router: Router, private userService: UserService, private storageService: LocalStorageService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }
  ngOnInit() {
    this.tagService.getAllTags().subscribe(
      (data: Tag[]) => {
        this.arrOfTagType = data;
        this.allTags = data.map(t => t.name);
        this.userService.getCurrentUserInfo().subscribe(
          (data1: User) => {
            this.tags = data1.subscribedToTags.map(t => t.name);
            this.tags.forEach(value => {
              const index = this.allTags.indexOf(value);
              this.allTags.splice(index, 1);
              this.tagCtrl.setValue(null);
            });
          }
        );
        this.tagCtrl.setValue(null);
      }
    );
  }

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  save() {
    const arr: number[] = [];
    this.arrOfTagType.forEach(value => {
      if (this.tags.indexOf(value.name) > -1) {
        arr.push(value.id);
      }
    });
    this.userService.saveSubscribedTags(arr).subscribe();
    this.storageService.store(searchPrefs, this.prefsCtrl.value.toString());
  }
}
