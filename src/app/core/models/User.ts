import {Tag} from './Tag';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: { id: number; name: string; }[];
  subscribedToTags: Tag[];
}
