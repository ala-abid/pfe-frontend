import {User} from './User';
import {Reply} from './Reply';

export class Answer {
  id: number;
  txt: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  upVotes: string;
  downVotes: string;
  solution: string;
  replies: Reply[];
}
