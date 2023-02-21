import React from 'react';
import './Root.scss';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div className='main-layout'>
      <Outlet />
    </div>
  );
};

export default Root;
