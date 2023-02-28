import React from 'react';
import { ProfileProps } from './types';
import './styles.scss';
import { useRecoilState } from 'recoil';
import authAtom from '@store/auth';
import { InputText } from 'primereact/inputtext';

const Profile: React.FC<ProfileProps> = () => {
  const [authState, setAuthState] = useRecoilState(authAtom);

  return (
    <div>
      <InputText value={authState.user?.email} />
      <InputText value={authState.user?.first_name} />
      <InputText value={authState.user?.last_name} />
    </div>
  );
};

export default Profile;
