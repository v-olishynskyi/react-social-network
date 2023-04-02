import React from 'react';
import { LeftMenuProps } from './types';
import './styles.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftMenuItem } from './components';

const routes = [
  {
    icon: 'pi-th-large',
    route: '/feeds',
    label: 'Стрічка',
  },
  {
    icon: 'pi-github',
    route: '/community',
    label: 'Мої спільноти',
  },
  {
    icon: 'pi-inbox',
    route: '/chats',
    label: 'Повідомлення',
  },
  {
    icon: 'pi-cog',
    route: '/settings',
    label: 'Налаштування',
  },
];

const LeftMenu: React.FC<LeftMenuProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className='left-menu-wrapper'>
      <ul className='menu'>
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
      </ul>
    </aside>
  );
};

export default LeftMenu;
