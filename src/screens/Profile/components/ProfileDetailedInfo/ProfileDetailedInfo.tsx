import React from 'react';
import { ProfileDetailedInfoProps } from './types';
import './styles.scss';
import { CakeIcon, GlobeIcon, MapMarkerIcon } from '@assets/svg';

const ProfileDetailedInfo: React.FC<ProfileDetailedInfoProps> = ({ user }) => {
  return (
    <ul className='profile-details-list'>
      {user?.website && (
        <li className='mb-3'>
          <div className='icon'>
            <GlobeIcon />
          </div>
          <a href={user.website}>{user.website}</a>
        </li>
      )}
      {user?.birthday && (
        <li className='mb-3'>
          <div className='icon'>
            <CakeIcon />
          </div>
          <span>
            {new Date(user.birthday).toLocaleDateString('uk', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </li>
      )}
      {user?.address && (
        <li className='mb-3'>
          <div className='icon'>
            <MapMarkerIcon />
          </div>
          <span>{user.address}</span>
        </li>
      )}
      <li className='mb-3'>{user?.followers} Followers</li>
      <li>{user?.following} Following</li>
    </ul>
  );
};

export default ProfileDetailedInfo;
