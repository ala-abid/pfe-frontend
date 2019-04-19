import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent implements OnInit {

  protected name = '';
  protected username = '';
  protected email = '';
  protected password = '';
  protected showError = false;
  constructor(private authService: AuthService, private storageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.name, this.username, this.email, this.password).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/signIn');
      },
      (error) => {
        console.log(error);
        this.showError = true;
      }
    );
  }

}
