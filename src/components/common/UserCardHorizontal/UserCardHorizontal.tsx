import React from 'react';
import { UserCardHorizontalProps } from './types';
import './styles.scss';
import { User } from '@utils/types';
import { Avatar } from '@components';

const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  rightButton,
  subtitle,
  classes = '',
}) => {
  return (
    <div className={`user-card-horizontal ${classes}`}>
      <div className='flex flex-row align-center'>
        <Avatar user={user as User} size='large' className='mr-4' />
        <div>
          <p className='user-fullname'>{user?.fullname}</p>
          {subtitle && <p className='subtitle'>{subtitle}</p>}
        </div>
      </div>
      {rightButton}
    </div>
  );
};

export default React.memo(UserCardHorizontal);
