import React from 'react';
import { LeftMenuProps } from './types';
import './styles.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftMenuItem } from './components';

const routes = [
  {
    icon: 'pi-th-large',
    route: '/feeds',
    label: 'Feeds',
  },
  {
    icon: 'pi-github',
    route: '/community',
    label: 'My community',
  },
  {
    icon: 'pi-inbox',
    route: '/messages',
    label: 'Messages',
  },
  {
    icon: 'pi-cog',
    route: '/settings',
    label: 'Settings',
  },
];

const LeftMenu: React.FC<LeftMenuProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className='left-menu-wrapper'>
      {routes.map(route => {
        const isActive = location.pathname.includes(route.route);

        const onPressRoute = () => navigate(route.route);

        return (
          <LeftMenuItem
            key={route.route}
            isActive={isActive}
            route={route}
            onPress={onPressRoute}
          />
        );
      })}
    </aside>
  );
};

export default LeftMenu;
