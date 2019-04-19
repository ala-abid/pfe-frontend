/* tslint:disable:variable-name */
import {User} from './User';
import {Question} from './Question';

export class VoteQ {
  id: number;
  qser: User;
  question: Question;
  votedAt: Date;
  upDown: string;
}
