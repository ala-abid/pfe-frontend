import {Routes} from '@angular/router';
import {LoginComponent} from './core/pages/login/login.component';
import {HomeComponent} from './core/pages/home/home.component';
import {RegisterComponent} from './core/pages/register/register.component';
import {AuthGuard} from './core/guards/auth.guard';
import {QuestionComponent} from './core/pages/question/question.component';
export const ROUTES: Routes = [
  {path: 'signIn', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signUp', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'question/:id', component: QuestionComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
