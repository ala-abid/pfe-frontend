import {User} from './User';

export class Group {
  id: number;
  name: string;
  description: string;
  users: User[];
  admins: User[];
}
