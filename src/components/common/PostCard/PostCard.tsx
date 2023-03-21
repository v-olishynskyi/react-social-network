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
import { useLikePost } from '@api/hooks/post';
import { useUnlikePost } from '@api/hooks/post/useUnlikePost';

const PostCard: React.FC<PostCardProps> = ({ item }) => {
  const user = useRecoilValue(userSelector);

  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const onLike = (action: 'like' | 'unlike') => {
    action === 'like' ? like(item.uid) : unlike(item.uid);
  };

  const postDate = item?.created_at?.toDate()
    ? `${new Date(item.created_at.toDate()).toLocaleDateString(
        'uk'
      )} ${new Date(item.created_at.toDate()).toLocaleTimeString('uk')}`
    : '';

  return (
    <Card withPaddings classes='post-card'>
      {user && <UserCardHorizontal user={user} subtitle={postDate} />}
      <div className='my-4'>{item.content}</div>
      {!!item.attachments?.length && (
        <div className='my-4 flex flex-wrap'>
          {item.attachments?.map(item => (
            <img
              src={item.url}
              style={{
                width: 150,
                height: 150,
                marginRight: 16,
                marginBottom: 8,
              }}
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
        <CommentsCounter commentsCount={0} isCommented={item.is_commented} />
      </div>
    </Card>
  );
};

export default PostCard;
