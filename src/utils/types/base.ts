import { PostAuthor } from '@api/services/Post';
import { Timestamp } from 'firebase/firestore';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface User {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  authProvider: string;
  avatar: string;
  fullname: string;

  wallpaper?: string;
  job_title?: string;
  website?: string;
  birthday?: string;
  address?: string;
  socials?: Array<{ social_name: string; link: string }>;
  followers: number;
  following: number;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type ApiError = {
  message: string;
  code?: number;
};

export type Post = {
  uid: string;
  content: string;
  author: PostAuthor;
  is_commented: boolean;
  comments_count: number;
  is_liked: boolean;
  likes: number;
  created_at: Timestamp;
  updated_at: Timestamp;
  attachments: Array<{ url: string }>;
};
