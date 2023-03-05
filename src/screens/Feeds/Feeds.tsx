import React from 'react';
import { FeedsProps } from './types';
import './styles.scss';
import { Avatar } from '@components';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CameraIcon } from '@assets/svg';

const Feeds: React.FC<FeedsProps> = () => {
  const user = useRecoilValue(userSelector);

  return (
    <section className='feeds-container'>
      <div className='fast-post-wrapper'>
        <div className='input-wrapper'>
          <Avatar user={user!} size='normal' className='mr-4' />
          <InputText placeholder='Розкажіть що нового' />
        </div>
        <div className='buttons-wrapper'>
          <div className='flex flex-row items-center'>
            <Button text icon={<CameraIcon width={24} height={24} />}>
              Живе відео
            </Button>
            <Button text icon='pi pi-image'>
              Фото/Відео
            </Button>
          </div>
          <Button severity='info'>Post</Button>
        </div>
      </div>
    </section>
  );
};

export default Feeds;
