import React from 'react';
import { LoaderProps } from './types';
import './styles.scss';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <ProgressSpinner />
    </div>
  );
};

export default Loader;
