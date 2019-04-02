export class Answer {
  id: string;
  txt: string;
  author: {
    username: string;
    desc: string;
  };
  replies: [];
}
