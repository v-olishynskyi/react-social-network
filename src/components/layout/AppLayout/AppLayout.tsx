import React from 'react';
import { LeftMenu, Toolbar } from '@components';
import { Outlet } from 'react-router-dom';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';

const AppLayout: React.FC = () => {
  const isExtraLargeDisplay = useMediaQuery({
    minWidth: 1920,
  });
  const isTablet = useMediaQuery({
    maxWidth: 768,
  });

  return (
    <>
      <Toolbar />
      <main
        className={`app-layout flex ${
          isExtraLargeDisplay ? 'justify-center' : 'justify-between'
        }`}>
        {!isTablet && <LeftMenu />}
        <div className='main-content'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AppLayout;
