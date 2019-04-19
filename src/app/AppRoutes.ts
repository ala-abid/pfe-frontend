import {Routes} from '@angular/router';
import {LoginComponent} from './core/pages/login/login.component';
import {HomeComponent} from './core/pages/home/home.component';
import {RegisterComponent} from './core/pages/register/register.component';
import {AuthGuard} from './core/guards/auth.guard';
import {QuestionComponent} from './core/pages/question/question.component';
import {JiraIssueComponent} from './core/pages/jira-issue/jira-issue.component';
import {AskQuestionComponent} from './core/pages/ask-question/ask-question.component';
import {AllUsersComponent} from './core/pages/all-users/all-users.component';
import {AdvancedSearchComponent} from './core/pages/advanced-search/advanced-search.component';
import {AccountSettingsComponent} from './core/pages/account-settings/account-settings.component';
import {MyGroupsComponent} from './core/pages/my-groups/my-groups.component';
import {GroupComponent} from './core/pages/group/group.component';
export const ROUTES: Routes = [
  {path: 'signIn', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signUp', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'question/:id', component: QuestionComponent, canActivate: [AuthGuard]},
  {path: 'askQuestion', component: AskQuestionComponent, canActivate: [AuthGuard]},
  {path: 'jira/:id', component: JiraIssueComponent, canActivate: [AuthGuard]},
  {path: 'users', component: AllUsersComponent, canActivate: [AuthGuard]},
  {path: 'search/:query', component: AdvancedSearchComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard]},
  {path: 'groups', component: MyGroupsComponent, canActivate: [AuthGuard]},
  {path: 'group/:id', component: GroupComponent, canActivate: [AuthGuard]},

  {path: '', canActivate: [AuthGuard], redirectTo: 'home', pathMatch: 'full'}
];
