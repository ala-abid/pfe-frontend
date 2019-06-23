import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  status = new FormControl();
  tags = new FormControl();
  searchField = new FormControl();
  sortBy = new FormControl();

  query = '';
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  datasource = [];

  activePageDataChunk = []

  constructor(private route: ActivatedRoute) {
    // Generaing dummy content
    for (let i = 0; i < 1000; i++) {
      let dummyObject = { field1: `f1.value ${i+1}`, field2: `f2.value ${i+1}`, field3: `f3.value ${i+1}` }
      this.datasource.push(dummyObject);
    }
    this.activePageDataChunk = this.datasource.slice(0,this.pageSize);
  }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('query');
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.datasource.slice(firstCut, secondCut);
  }

}
