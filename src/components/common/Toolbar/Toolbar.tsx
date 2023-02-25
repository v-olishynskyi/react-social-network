import React from 'react';
import { Toolbar as PrimereactToolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { useLogout } from '@api/hooks/auth';
import { Avatar } from '@components/common';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';
import './styles.scss';

const Toolbar: React.FC = () => {
  const { mutate: logout, isLoading } = useLogout();

  const user = useRecoilValue(userSelector);

  const logo = (
    <div className='site-logo-container'>
      <div className='site-logo'>React Social Network</div>
      <div>Just for fun</div>
    </div>
  );

  return (
    <>
      <PrimereactToolbar
        start={<>{logo}</>}
        end={
          <>
            {/* <Button
              onClick={() => logout()}
              loading={isLoading}
              disabled={isLoading}>
              Вийти
            </Button> */}
            <Avatar
              user={{
                ...user,
                avatar: 'https://pixlr.com/images/index/remove-bg.webp',
              }}
              isGoToProfile={false}
            />
          </>
        }
      />
    </>
  );
};

export default Toolbar;
