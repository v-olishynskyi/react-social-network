import React from 'react';
import { ProfileProps } from './types';
import './styles.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import authAtom, { userSelector } from '@store/auth';
import { Button } from 'primereact/button';
import { ProfileDetailedInfo } from './components';
import { Card, Loader } from '@components';
import { UploadCloudIcon } from '@assets/svg';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseDB, firebaseStorage } from '@services';
import { doc, updateDoc } from 'firebase/firestore';
import { useToastContext } from '@context';
import { User } from '@utils/types';
import { useParams } from 'react-router-dom';

const Profile: React.FC<ProfileProps> = () => {
  const params = useParams();

  const { showToast } = useToastContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [isLoadAvatar, setIsLoadAvatar] = React.useState(false);

  const [authState, setAuthState] = useRecoilState(authAtom);

  const user = useRecoilValue(userSelector);

  const isMe = React.useMemo(
    () => user?.uid === params.id,
    [params.id, user?.uid]
  );

  const handleOpenPicker = () => {
    inputRef.current?.click();
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const avatarRef = ref(firebaseStorage, 'avatars/' + user?.uid);
      // 'file' comes from the Blob or File API
      setIsLoadAvatar(true);
      uploadBytesResumable(avatarRef, file).then(() => {
        getDownloadURL(avatarRef).then(async avatarUrl => {
          if (user) {
            try {
              const docRef = doc(firebaseDB, 'users', user.uid);
              await updateDoc(docRef, { avatar: avatarUrl });
              setAuthState(prev => ({
                ...prev,
                user: { ...(prev.user as User), avatar: avatarUrl },
              }));
              setIsLoadAvatar(false);
            } catch (error: any) {
              showToast({
                severity: 'error',
                summary: 'Щось пішло не так',
                detail: error.message,
              });
              setIsLoadAvatar(false);
            }
          }
        });
      });
    }
  };

  return (
    <>
      {user ? (
        <div className='profile-wrapper'>
          <div className='base-info'>
            <img
              src={
                user.wallpaper ||
                'https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg'
              }
              className='wallpaper'
              alt='wallpaper'
            />
            <div className='avatar'>
              {isLoadAvatar ? (
                <Loader />
              ) : (
                <>
                  <img src={user.avatar} alt='avatar' />
                  {isMe && (
                    <div className='upload-icon' onClick={handleOpenPicker}>
                      <UploadCloudIcon />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className='name-block'>
              <div>
                <h2 className='user-name'>{authState.user?.fullname}</h2>
                <p className='job-title'>UI Designer</p>
              </div>
              <Button>Edit basic info</Button>
            </div>
          </div>
          <Card classes='detailed-info' withPaddings>
            <Card classes='intro' withPaddings>
              <h3>Intro</h3>
              <ProfileDetailedInfo />
            </Card>
          </Card>
        </div>
      ) : null}

      <input
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={onPickImage}
        hidden
      />
    </>
  );
};

export default Profile;
