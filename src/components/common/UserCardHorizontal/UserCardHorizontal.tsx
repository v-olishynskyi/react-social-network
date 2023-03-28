import React from 'react';
import { UserCardHorizontalProps } from './types';
import './styles.scss';
import { User } from '@utils/types';
import { Avatar } from '@components';
import { useNavigate } from 'react-router-dom';

const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  rightButton,
  subtitle,
  classes = '',
  shouldRedirect = true,
}) => {
  const navigate = useNavigate();

  const onClickAvatar = () =>
    shouldRedirect && navigate(`/profile/${user.uid}`);

  return (
    <div className={`user-card-horizontal ${classes}`}>
      <div className='flex flex-row align-center'>
        <div onClick={onClickAvatar}>
          <Avatar
            user={user as User}
            size='large'
            className='card-avatar mr-4'
          />
        </div>
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
