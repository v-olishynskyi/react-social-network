import React from 'react';
import { FeedsProps } from './types';
import './styles.scss';
import { CreatePost, PostCard } from '@components';
import { useRecoilValue } from 'recoil';
import { usePosts } from '@api/hooks/post/usePosts';
import { ProgressSpinner } from 'primereact/progressspinner';
import { postsSelector } from '@store/posts';

const Feeds: React.FC<FeedsProps> = () => {
  const posts = useRecoilValue(postsSelector);

  const { isLoading } = usePosts();

  return (
    <section className='feeds-container'>
      <CreatePost />
      {isLoading ? (
        <ProgressSpinner />
      ) : (
        posts?.map(post => (
          <div key={post.uid} className='post-card-container'>
            <PostCard item={post} />
          </div>
        ))
      )}
    </section>
  );
};

export default Feeds;
