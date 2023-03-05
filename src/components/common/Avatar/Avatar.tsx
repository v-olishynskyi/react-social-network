import React from 'react';
import { AvatarProps } from './types';
import './styles.scss';
import { Avatar as PrimereactAvatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@api/hooks/auth';
import { Button } from 'primereact/button';
import { useTheme } from '@utils/theme';

const Avatar: React.FC<AvatarProps> = ({
  user,
  badge,
  shape = 'circle',
  size = 'xlarge',
  isGoToProfile = true,
  withMenu,
  ...rest
}) => {
  const { colors } = useTheme();

  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useLogout();

  const { avatar, first_name, last_name, fullname } = user;

  const overlayPanelRef = React.useRef<OverlayPanel>(null);

  const withBadge = badge !== undefined && badge !== null;
  const avatarLabel = `${first_name[0]}${last_name[0]}`;
  const source = avatar ? { image: avatar } : { label: avatarLabel };

  const goToProfile = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    navigate(`/profile/${user.uid}`);
    closeMenu(e);
  };
  const closeMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    overlayPanelRef.current?.toggle(e);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isGoToProfile) {
      goToProfile(e);
    } else {
      overlayPanelRef.current?.toggle(e);
    }
  };

  const onLogout = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    logout();
    closeMenu(e);
  };

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
        {withMenu && <i className='pi pi-chevron-down chevron' />}
      </div>
      {withMenu && (
        <OverlayPanel ref={overlayPanelRef}>
          <div className='overlay-menu-wrapper'>
            <Button
              onClick={goToProfile}
              loading={isLoading}
              disabled={isLoading}
              className='menu-button'
              icon='pi pi-user'
              severity='info'>
              Профіль
            </Button>
            <Button
              onClick={onLogout}
              loading={isLoading}
              disabled={isLoading}
              icon='pi pi-sign-out'
              severity='danger'>
              Вийти
            </Button>
          </div>
        </OverlayPanel>
      )}
    </>
  );
};

export default Avatar;
