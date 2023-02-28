import React from 'react';
import { LeftMenuItemProps } from './types';
import './styles.scss';
import { classNames } from 'primereact/utils';

const LeftMenuItem: React.FC<LeftMenuItemProps> = ({
  isActive,
  route: { icon, label },
  onPress,
}) => {
  return (
    <div
      className={classNames('left-menu-item', { active: isActive })}
      onClick={onPress}>
      <i className={`pi ${icon} menu-icon`} />
      <span>{label}</span>
    </div>
  );
};

export default LeftMenuItem;
