import {User} from './User';

export class Reply {
  id: number;
  txt: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}
