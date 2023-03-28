import React from 'react';
import { PostCardProps } from './types';
import './styles.scss';
import {
  Card,
  CommentsCounter,
  LikesCounter,
  UserCardHorizontal,
} from '@components';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@store/auth';
import { useLikePost, useUnlikePost, useDeletePost } from '@api/hooks/post';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { MenuItem } from 'primereact/menuitem';

const PostCard: React.FC<PostCardProps> = ({ item }) => {
  const user = useRecoilValue(userSelector);

  const menuRef = React.useRef<Menu>(null);

  const isMyselfPost = item.author.uid === user?.uid;

  const [visibleDeleteConfirmPopup, setVisibleDeleteConfirmPopup] =
    React.useState(false);

  let items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => null },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: () => openDeleteConfirmPopup(),
    },
  ];

  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();
  const { mutate: deletePost } = useDeletePost();

  const onLike = (action: 'like' | 'unlike') => {
    action === 'like' ? like(item.uid) : unlike(item.uid);
  };

  const handleDeletePost = () => deletePost(item.uid);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    menuRef.current?.toggle(e);

  const openDeleteConfirmPopup = () => setVisibleDeleteConfirmPopup(true);
  const closeDeleteConfirmPopup = () => setVisibleDeleteConfirmPopup(false);

  const postDate = item?.created_at?.toDate()
    ? `${new Date(item.created_at.toDate()).toLocaleDateString(
        'uk'
      )} ${new Date(item.created_at.toDate()).toLocaleTimeString('uk')}`
    : '';

  const overlayMenu = <Menu model={items} popup ref={menuRef} />;

  return (
    <Card withPaddings classes='post-card'>
      {user && (
        <UserCardHorizontal
          user={item.author}
          subtitle={postDate}
          rightButton={
            isMyselfPost && (
              <>
                <Button
                  icon='pi pi-ellipsis-h'
                  rounded
                  text
                  aria-label='Open menu'
                  onClick={openMenu}
                />
                {overlayMenu}
                <ConfirmDialog
                  visible={visibleDeleteConfirmPopup}
                  onHide={closeDeleteConfirmPopup}
                  message='Ви впевнені, що хочете видалити даний допис?'
                  accept={handleDeletePost}
                  reject={closeDeleteConfirmPopup}
                  icon='pi pi-exclamation-triangle'
                  header='Підтвердження'
                  contentClassName='confirmation-popup-content'
                  acceptLabel='Так'
                  rejectLabel='Відміна'
                />
              </>
            )
          }
        />
      )}
      <div className='my-4'>{item.content}</div>
      {!!item.attachments?.length && (
        <div className='row flex-wrap align-start'>
          {item.attachments?.map(img => (
            <Image
              key={img.url}
              src={img.url}
              className='attached-image'
              preview
            />
          ))}
        </div>
      )}
      <div className='flex flex-row items-center '>
        <LikesCounter
          classes='mr-4'
          isLiked={item.is_liked}
          likeCount={item.likes}
          onClick={onLike}
        />
        <CommentsCounter
          commentsCount={item.comments_count}
          isCommented={item.is_commented}
        />
      </div>
    </Card>
  );
};

export default PostCard;
