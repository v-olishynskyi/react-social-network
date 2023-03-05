import React from 'react';
import './styles.scss';
import { Outlet } from 'react-router-dom';
import { SettingsMenu } from './components';

const Settings: React.FC = () => {
  return (
    <div className='settings-wrapper'>
      <div className='settings-content'>
        <div className='flex flex-row h-full'>
          <SettingsMenu />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
