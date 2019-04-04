import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraIssueComponent } from './jira-issue.component';

describe('JiraIssueComponent', () => {
  let component: JiraIssueComponent;
  let fixture: ComponentFixture<JiraIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiraIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
