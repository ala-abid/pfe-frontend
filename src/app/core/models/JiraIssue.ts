export class JiraIssue {
  summary = '';
  description = '';
  assignee = '';
  creationDate : Date;
  projectName = '';
  comments: {author: string, creationDate: Date, txt: string}[];
}
