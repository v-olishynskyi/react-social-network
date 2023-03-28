import { User } from '@utils/types';

export type UserCardHorizontalProps = {
  user: Pick<User, 'uid' | 'fullname' | 'avatar' | 'job_title'>;
  subtitle?: string;
  rightButton?: React.ReactNode;
  classes?: string;
  shouldRedirect?: boolean;
};
