import React from 'react';
import './styles.scss';
import { Card, UserCardHorizontal } from '@components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';
import { classNames } from 'primereact/utils';
import { Outlet, useNavigate } from 'react-router-dom';
import chatsAtom from '@store/chats';

const Chats: React.FC = () => {
  const navigate = useNavigate();

  const user = useRecoilValue(userSelector);
  const [{ activeChat }, setChats] = useRecoilState(chatsAtom);

  const chats = Array(15)
    .fill(undefined)
    .map((_, index) => index.toString());

  const onClickChat = (id: string) => {
    setChats(prev => ({ ...prev, activeChat: id }));
    navigate('/chats/' + id);
  };

  return (
    <Card classes='messages' withPaddings>
      <Card classes='chats-list' withPaddings>
        {chats.map(item => (
          <Card
            key={item}
            classes={classNames('chat-card', { active: activeChat === item })}
            onClick={() => onClickChat(item)}>
            <UserCardHorizontal
              user={
                { ...user, fullname: 'Namsdas das dasdpasdasa das s' } as any
              }
              subtitle='Thanks buddy, you to fdsjk nsdkf nkjs ndfkjn...'
            />
            <div>11:26 am</div>
          </Card>
        ))}
      </Card>
      <div className='chat-wrapper'>{activeChat && <Outlet />}</div>
    </Card>
  );
};

export default Chats;
