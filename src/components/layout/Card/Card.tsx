import React from 'react';
import { CardProps } from './types';
import './styles.scss';

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  classes = '',
  withPaddings,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`base-card ${withPaddings ? 'p-6' : ''} ${classes}`}>
      {children}
    </div>
  );
};

export default Card;
