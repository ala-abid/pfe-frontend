export class VisitedPage {
  url: string;
  pageName: string;
  constructor(url: string, pageName: string) {
    this.pageName = pageName;
    this.url = url;
  }
}
