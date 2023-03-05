import React from 'react';
import { SettingsMenuProps } from './types';
import './styles.scss';
import { SettingsMenuItem } from './components';
import {
  ClockIcon,
  EyeIcon,
  LanguageIcon,
  NoIcon,
  NotificationIcon,
  SecurityIcon,
} from '@assets/svg';
import { useLocation } from 'react-router-dom';

const routes = [
  {
    icon: <LanguageIcon />,
    label: 'Language',
    route: '/settings/language',
  },
  {
    icon: <NoIcon />,
    label: 'Blocking',
    route: '/settings/blocking',
  },
  {
    icon: <NotificationIcon />,
    label: 'Notifications',
    route: '/settings/notifications',
  },
  {
    icon: <SecurityIcon />,
    label: 'Password & Security',
    route: '/settings/security',
  },
  {
    icon: <ClockIcon />,
    label: 'Activity Log',
    route: '/settings/activity-log',
  },
  {
    icon: <EyeIcon />,
    label: 'Viewing & Sharing',
    route: '/settings/viewing',
  },
];

const SettingsMenu: React.FC<SettingsMenuProps> = () => {
  const location = useLocation();

  return (
    <div className='settings-menu-wrapper'>
      <ul>
        <div className='menu'>
          {routes.map(item => {
            const isActive = location.pathname.includes(item.route);

            return (
              <SettingsMenuItem
                icon={item.icon}
                label={item.label}
                route={item.route}
                isActive={isActive}
              />
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default SettingsMenu;
