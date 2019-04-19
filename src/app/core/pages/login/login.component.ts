import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {homePath, tokenKey} from '../../../AppConstants';
import {Router} from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class LoginComponent implements OnInit {
  protected usernameOrEmail = '';
  protected password = '';
  protected showError = false;
  constructor(private loginService: AuthService, private storageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.usernameOrEmail, this.password).subscribe(
      (resp: any) => {
        this.storageService.store(tokenKey, resp.token);
        this.router.navigateByUrl(homePath);
      },
      () => {
        this.showError = true;
      }
    );
  }
}
