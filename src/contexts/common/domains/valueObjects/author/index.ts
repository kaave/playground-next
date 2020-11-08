import { Url } from '../url';

export type Author = {
  username: string;
  bio: string;
  image: Url;
  following: boolean;
};
