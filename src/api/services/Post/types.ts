import { User } from '@utils/types';

export const defaultPostData: Omit<CreatePostData, 'author'> = {
  content: '',
  comments_count: 0,
  is_liked: false,
  likes: 0,
  attachments: [],
};

export type PostAuthor = Pick<
  User,
  'avatar' | 'uid' | 'fullname' | 'job_title' | 'first_name' | 'last_name'
>;

export type CreatePostData = {
  author: PostAuthor;
  content: string;
  comments_count: number;
  is_liked: boolean;
  likes: number;
  attachments: Array<{ url: string }>;
};
