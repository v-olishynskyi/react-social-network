import React from 'react';
import { AvatarProps } from './types';
import './styles.scss';
import { Avatar as PrimereactAvatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';

const Avatar: React.FC<AvatarProps> = ({
  user,
  badge,
  shape = 'circle',
  size = 'xlarge',
  ...rest
}) => {
  const navigate = useNavigate();

  const { avatar, first_name, last_name } = user;
  const withBadge = badge !== undefined && badge !== null;

  const avatarLabel = `${first_name[0]}${last_name[0]}`;

  const source = avatar ? { image: avatar } : { label: avatarLabel };

  const onClick = () => navigate(`/profile/${user.id}`);

  return (
    <PrimereactAvatar
      {...rest}
      {...source}
      shape={shape}
      size={size}
      className={classNames({ 'p-overlay-badge': withBadge })}
      onClick={onClick}>
      {badge !== undefined && <Badge value={badge} />}
    </PrimereactAvatar>
  );
};

export default Avatar;
