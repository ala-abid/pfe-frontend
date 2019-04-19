import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  query = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('query');
  }

}
