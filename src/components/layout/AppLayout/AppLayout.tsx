import React from 'react';
import { Toolbar } from '@components';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  return (
    <>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
