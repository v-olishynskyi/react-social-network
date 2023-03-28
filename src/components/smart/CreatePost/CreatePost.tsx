import React from 'react';
import { CreatePostProps } from './types';
import './styles.scss';
import { Avatar, Card, UserCardHorizontal } from '@components';
import { useTheme } from '@utils/theme';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ImageIcon } from '@assets/svg';
import { useCreatePost } from '@api/hooks/post';
import {
  CreatePostData,
  defaultPostData,
  PostAuthor,
} from '@api/services/Post';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '@services';

const CreatePost: React.FC<CreatePostProps> = () => {
  const { colors } = useTheme();
  const user = useRecoilValue(userSelector);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [content, setContent] = React.useState('');
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [attachments, setAttachments] = React.useState<
    Array<{ type: 'photo' | 'video'; url: string }>
  >([]);

  const { mutateAsync: createPost, isLoading } = useCreatePost();

  const showModal = () => setIsShowModal(true);
  const hideModal = () => setIsShowModal(false);

  const showPicker = () => inputRef.current?.click();

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setAttachments(prev => [
      //   ...prev,
      //   { type: 'photo', url: URL.createObjectURL(file) },
      // ]);
      const attachmentRef = ref(
        firebaseStorage,
        'attachments/' + user?.uid + Date.now()
      );
      // // 'file' comes from the Blob or File API
      // setIsLoadAvatar(true);
      uploadBytesResumable(attachmentRef, file).then(() => {
        getDownloadURL(attachmentRef).then(async avatarUrl => {
          setAttachments(prev => [...prev, { type: 'photo', url: avatarUrl }]);
        });
      });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitPost = async () => {
    const author: PostAuthor = {
      uid: user!.uid,
      avatar: user?.avatar || '',
      fullname: user!.fullname,
      job_title: user?.job_title || '',
      first_name: user!.first_name,
      last_name: user!.last_name,
    };

    const data: CreatePostData = {
      ...defaultPostData,
      author,
      content,
      attachments,
    };

    await createPost(data);
    setContent('');
    hideModal();
  };

  const footerContent = (
    <div className='flex justify-between pt-4'>
      <div className='flex'>
        <Button
          text
          icon={
            <div className='mr-2'>
              <ImageIcon stroke={colors.primaryText} />
            </div>
          }
          style={{ color: colors.primaryText }}
          onClick={showPicker}>
          Фото/Відео
        </Button>
      </div>
      <Button
        label='Публікація'
        icon='pi pi-check'
        onClick={handleSubmitPost}
        disabled={!content && !attachments.length}
      />
    </div>
  );

  return (
    <>
      <Card withPaddings classes='create-post-wrapper'>
        <div className='input-wrapper'>
          {user && <Avatar user={user!} size='large' className='mr-4' />}
          <InputText
            placeholder={`Що у вас нового, ${user?.first_name}`}
            className={'w-full rounded-2xl'}
            style={{
              backgroundColor: colors.primaryBg,
              color: colors.primaryText,
            }}
            onClick={showModal}
            value=''
          />
        </div>
        <div className='buttons-wrapper'>
          <div className='flex flex-row items-center'>
            <Button
              text
              icon={
                <div className='mr-2'>
                  <ImageIcon />
                </div>
              }
              onClick={showModal}>
              Фото/Відео
            </Button>
          </div>
          <Button type='button' label='Публікація' onClick={showModal} />
        </div>
      </Card>
      <Dialog
        header='Створити допис'
        visible={isShowModal}
        style={{ width: '50vw' }}
        onHide={hideModal}
        footer={footerContent}
        draggable={false}
        blockScroll>
        <div className='input-wrapper'>
          {user && (
            <UserCardHorizontal
              user={user!}
              classes='my-4'
              shouldRedirect={false}
            />
          )}
          <InputTextarea
            placeholder={`Що у вас нового, ${user?.first_name}`}
            className={'w-full rounded-2xl post-text-area'}
            style={{
              backgroundColor: colors.primaryBg,
              color: colors.primaryText,
            }}
            onChange={handleChangeInput}
            value={content}
            autoFocus
            autoResize
          />
          {!!attachments.length && (
            <div className='flex'>
              {attachments.map(item => (
                <img src={item.url} className='attached-image' alt={item.url} />
              ))}
            </div>
          )}
        </div>
      </Dialog>

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

export default CreatePost;
