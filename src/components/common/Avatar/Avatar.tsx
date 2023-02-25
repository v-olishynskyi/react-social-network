import React from 'react';
import { AvatarProps } from './types';
import './styles.scss';
import { Avatar as PrimereactAvatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@api/hooks/auth';
import { Button } from 'primereact/button';

const Avatar: React.FC<AvatarProps> = ({
  user,
  badge,
  shape = 'circle',
  size = 'xlarge',
  isGoToProfile = true,
  ...rest
}) => {
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useLogout();

  const { avatar, first_name, last_name, fullname } = user;

  const overlayPanelRef = React.useRef<OverlayPanel>(null);

  const withBadge = badge !== undefined && badge !== null;
  const avatarLabel = `${first_name[0]}${last_name[0]}`;
  const source = avatar ? { image: avatar } : { label: avatarLabel };

  const goToProfile = () => navigate(`/profile/${user.id}`);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    isGoToProfile ? goToProfile() : overlayPanelRef.current?.toggle(e);

  let items: MenuItem[] = [
    {
      label: 'Профіль',
      icon: 'pi pi-fw pi-user',
      command: goToProfile,
      disabled: isLoading,
    },
    { separator: true },
    {
      label: 'Вийти',
      icon: `pi pi-fw ${isLoading ? 'pi-spinner' : 'pi-sign-out'}`,
      command: () => logout(),
      disabled: isLoading,
    },
  ];

  return (
    <>
      <div className='avatar-container' onClick={onClick}>
        <PrimereactAvatar
          {...rest}
          {...source}
          title={fullname}
          shape={shape}
          size={size}
          className={classNames('avatar', { 'p-overlay-badge': withBadge })}>
          {badge !== undefined && <Badge value={badge} />}
        </PrimereactAvatar>
        <i className='pi pi-chevron-down'></i>
      </div>
      <OverlayPanel ref={overlayPanelRef}>
        <div className='overlay-menu-wrapper'>
          <Button
            onClick={() => goToProfile()}
            loading={isLoading}
            disabled={isLoading}
            className='menu-button'
            icon='pi pi-user'
            severity='info'>
            Профіль
          </Button>
          <Button
            onClick={() => logout()}
            loading={isLoading}
            disabled={isLoading}
            icon='pi pi-sign-out'
            severity='danger'>
            Вийти
          </Button>
        </div>
      </OverlayPanel>
    </>
  );
};

export default Avatar;
