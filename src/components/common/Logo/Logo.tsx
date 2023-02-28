import React from 'react';
import { LogoProps } from './types';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';
import logo from '@assets/logo-64.png';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';

const Logo: React.FC<LogoProps> = () => {
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({
    minWidth: 1200,
  });

  const goToHome = () => navigate('/');

  return (
    <div className={`site-logo-container`} onClick={goToHome}>
      <img
        src={logo}
        alt='Logo'
        className={classNames('logo-img', { 'mr-4': isDesktop })}
      />
      {isDesktop && <div className='site-logo'>React Social Network</div>}
    </div>
  );
};

export default Logo;
