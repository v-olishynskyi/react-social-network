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

  const [width, setWidth] = React.useState(0);

  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (divRef) {
      setWidth(divRef.current?.clientWidth || 0);
    }
  }, [divRef]);

  return (
    <div className={`user-card-horizontal ${classes}`}>
      <div className='flex flex-row align-center'>
        <Avatar
          user={user as User}
          size='large'
          className='card-avatar mr-4'
          onClick={onClickAvatar}
        />
        <div ref={divRef} style={{ flex: 1 }}>
          <span className='user-fullname'>{user?.fullname}</span>
          {subtitle && <p className='subtitle'>{subtitle}</p>}
        </div>
      </div>
      {rightButton}
    </div>
  );
};

export default React.memo(UserCardHorizontal);
