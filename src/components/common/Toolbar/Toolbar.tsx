import React from 'react';
import { Avatar, Logo } from '@components';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';
import { InputText } from 'primereact/inputtext';
import { useTheme } from '@utils/theme';

const Toolbar: React.FC = () => {
  const { colors } = useTheme();

  const user = useRecoilValue(userSelector)!;

  const isTablet = useMediaQuery({
    maxWidth: 768,
  });

  // const isMobile = useMediaQuery({
  //   maxWidth: 576,
  // });

  const isDesktop = useMediaQuery({
    minWidth: 1200,
  });

  const avatarSection = (
    <div className='flex flex-row items-center'>
      {!isTablet && <div className='name mr-4'>{user.fullname}</div>}
      <Avatar
        user={{
          ...user,
          avatar: user.avatar,
        }}
        isGoToProfile={false}
        withMenu
      />
    </div>
  );

  return (
    <>
      <div className='navbar-wrapper'>
        <div className='flex flex-row items-center'>
          <div style={{ marginRight: isDesktop ? 40 : 24 }}>
            <Logo />
          </div>
          <span className='p-input-icon-left'>
            <i className='pi pi-search' />
            <InputText
              placeholder='Search'
              className='search-bar'
              style={{
                backgroundColor: colors.primaryBg,
                color: colors.primaryText,
              }}
            />
          </span>
        </div>
        {avatarSection}
      </div>
    </>
  );
};

export default Toolbar;
