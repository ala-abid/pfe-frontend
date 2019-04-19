import {User} from './User';
import {Answer} from './Answer';
import {Tag} from './Tag';

export class Question {
  id: number;
  title: string;
  txt: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  upVotes: number;
  downVotes: number;
  solved: boolean;
  answers: Answer[];
  tags: Tag[];
}
