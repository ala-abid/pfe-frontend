import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { QuestionComponent } from './pages/question/question.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { JiraIssueComponent } from './pages/jira-issue/jira-issue.component';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { AdvancedSearchComponent } from './pages/advanced-search/advanced-search.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { MyGroupsComponent } from './pages/my-groups/my-groups.component';
import { GroupComponent } from './pages/group/group.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    QuestionComponent,
    JiraIssueComponent,
    AskQuestionComponent,
    AllUsersComponent,
    AdvancedSearchComponent,
    AccountSettingsComponent,
    MyGroupsComponent,
    GroupComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class CoreModule { }
