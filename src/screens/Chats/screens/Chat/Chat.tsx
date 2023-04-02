import React from 'react';
import { ChatProps } from './types';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { Avatar, Card, UserCardHorizontal } from '@components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userSelector } from '@store/auth';
import { useTheme } from '@utils/theme';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import chatsAtom from '@store/chats';

const Chat: React.FC<ChatProps> = () => {
  const { colors } = useTheme();
  const params = useParams() as { id?: string };

  const setChats = useSetRecoilState(chatsAtom);

  const messageListRef = React.useRef<HTMLDivElement>(null);

  const [content, setContent] = React.useState('');
  const [messages, setMessages] = React.useState(
    Array(50)
      .fill(undefined)
      .map((_, index) => index)
  );

  const addMessage = () => {
    setMessages(prev => [...prev, content.length]);
    setContent('');
  };

  const user = useRecoilValue(userSelector);

  React.useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
    });
  }, [messages]);

  return (
    <Card classes={classNames('chat')}>
      <div className='chat__header'>
        <UserCardHorizontal user={user as any} />
        <Button
          icon='pi pi-times'
          onClick={() => setChats(prev => ({ ...prev, activeChat: '' }))}
        />
      </div>
      <div ref={messageListRef} className='flex flex-col messages-list  px-4'>
        {messages.map(item => {
          const isMy = item % 2 === 0;
          return (
            <div
              key={item}
              className={classNames('flex flex-row mb-8 items-end', {
                'flex-row-reverse': isMy,
              })}>
              <Avatar
                size='normal'
                user={user as any}
                className={classNames({ 'mr-4': !isMy, 'ml-4': isMy })}
              />
              <div
                style={{
                  padding: 12,
                  backgroundColor: isMy
                    ? colors.secondaryBg
                    : colors.primaryBlue,
                  maxWidth: '80%',
                  alignSelf: isMy ? 'flex-end' : 'flex-start',
                  borderRadius: isMy ? '16px 16px 0 16px' : '16px 16px 16px 0',
                }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consectetur qui ad praesentium libero. Soluta corporis pariatur
                eligendi quos esse debitis ab id consectetur? Et, amet voluptas
                doloremque magnam libero accusantium!
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 100, padding: '16px 8px' }} className='flex '>
        <InputTextarea
          style={{ width: '100%' }}
          placeholder='Повідомлення'
          value={content.toString()}
          onChange={e => setContent(e.target.value.toString())}
        />
        <Button icon='pi pi-send' onClick={addMessage} />
      </div>
    </Card>
  );
};

export default Chat;
