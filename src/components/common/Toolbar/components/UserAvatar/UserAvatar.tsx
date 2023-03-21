import React from 'react';
import './styles.scss';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@api/hooks/auth';
import { Button } from 'primereact/button';
import { Avatar } from '@components';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';

const UserAvatar: React.FC = () => {
  const navigate = useNavigate();

  const user = useRecoilValue(userSelector);

  const { mutate: logout, isLoading } = useLogout();

  const overlayPanelRef = React.useRef<OverlayPanel>(null);

  const goToProfile = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    navigate(`/profile/${user?.uid}`);
    closeMenu(e);
  };
  const closeMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    overlayPanelRef.current?.toggle(e);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    overlayPanelRef.current?.toggle(e);

  const onLogout = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    logout();
    closeMenu(e);
  };

  return !user ? null : (
    <>
      <div className='user-avatar-container' onClick={onClick}>
        <Avatar user={user} />
        <i className='pi pi-chevron-down chevron' />
      </div>
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
    </>
  );
};

export default React.memo(UserAvatar);
