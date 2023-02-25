import React from 'react';
import { LogoProps } from './types';
import './styles.scss';

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className='site-logo-container'>
      <div className='site-logo'>React Social Network</div>
      <div>Just for fun</div>
    </div>
  );
};

export default Logo;
