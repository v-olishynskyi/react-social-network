import React from 'react';
import { SettingsMenuItemProps } from './types';
import './styles.scss';
import { Link } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { ChevronRightIcon } from '@assets/svg';
import { useTheme } from '@utils/theme';

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  isActive,
  label,
  route,
}) => {
  const { colors } = useTheme();

  return (
    <Link
      to={route}
      className={classNames('settings-menu-link justify-between')}>
      <div className='flex flex-row items-center'>
        <div className='icon'>{icon}</div>
        <span
          className={classNames({
            active: isActive,
          })}>
          {label}
        </span>
      </div>
      {isActive && (
        <ChevronRightIcon color={colors.primaryText} strokeWidth={2} />
      )}
    </Link>
  );
};

export default SettingsMenuItem;
