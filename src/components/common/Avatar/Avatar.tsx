import React from 'react';
import { AvatarProps } from './types';
import './styles.scss';
import { Avatar as PrimereactAvatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';

const Avatar: React.FC<AvatarProps> = ({
  user,
  badge,
  shape = 'circle',
  size = 'xlarge',
  ...rest
}) => {
  const { avatar, first_name, last_name, fullname } = user;

  const withBadge = badge !== undefined && badge !== null;
  const avatarLabel = `${first_name[0]}${last_name[0]}`;
  const source = avatar ? { image: avatar } : { label: avatarLabel };

  return (
    <PrimereactAvatar
      {...rest}
      {...source}
      title={fullname}
      shape={shape}
      size={size}
      className={classNames(
        'avatar',
        { 'p-overlay-badge': withBadge },
        rest.className
      )}>
      {badge !== undefined && <Badge value={badge} />}
    </PrimereactAvatar>
  );
};

export default React.memo(Avatar);
