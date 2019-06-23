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
import {DialogContentExampleDialog2, MyGroupsComponent} from './pages/my-groups/my-groups.component';
import {DialogOverviewExampleDialog, GroupComponent} from './pages/group/group.component';
import {AddTagDialogComponent, TagsComponent} from './pages/tags/tags.component';
import {DeleteConfirmationDialogComponent} from '../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditQuestionComponent } from './pages/edit-question/edit-question.component';

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
    DialogOverviewExampleDialog,
    DialogContentExampleDialog2,
    AddTagDialogComponent,
    TagsComponent,
    EditQuestionComponent
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
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogContentExampleDialog2,
    AddTagDialogComponent,
    DeleteConfirmationDialogComponent
  ]
})
export class CoreModule { }
