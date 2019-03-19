import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {loginPath, registerPath, tokenKey} from '../../AppConstants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: LocalStorageService, protected router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.storageService.delete(tokenKey);
  }

  showBar() {
    return this.router.url !== loginPath && this.router.url !== registerPath;
  }

}
