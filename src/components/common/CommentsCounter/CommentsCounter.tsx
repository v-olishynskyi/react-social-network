import React from 'react';
import { CommentsCounterProps } from './types';
import { CommentOutlineIcon, CommentSolidIcon } from '@assets/svg';

const CommentsCounter: React.FC<CommentsCounterProps> = ({
  classes,
  commentsCount,
  isCommented,
}) => {
  const icon = isCommented ? <CommentSolidIcon /> : <CommentOutlineIcon />;

  return (
    <div className={`flex flex-row items-center ${classes}`}>
      <div className='mr-1'>{icon}</div>
      <div className='flex flex-row mr-6'>{commentsCount} коментарів</div>
    </div>
  );
};

export default CommentsCounter;
