import React from 'react';
import { LikesCounterProps } from './types';
import { declOfNum } from '@utils/helpers';

const LikesCounter: React.FC<LikesCounterProps> = ({
  classes,
  isLiked,
  likeCount,
  onClick,
}) => {
  const [liked, setLiked] = React.useState(isLiked);
  const [count, setCount] = React.useState(likeCount);

  const likeIcon = liked ? 'pi pi-heart-fill' : 'pi pi-heart';

  const handleLike = () => {
    const action = liked ? 'unlike' : 'like';

    setLiked(prev => !prev);
    setCount(prev => (liked ? prev - 1 : prev + 1));

    onClick(action);
  };

  return (
    <div className={`flex flex-row items-center ${classes}`}>
      <i
        className={`pi ${likeIcon} mr-1 cursor-pointer`}
        onClick={handleLike}
      />
      <div className='flex flex-row mr-6'>
        {count} {declOfNum(count, ['лайк', 'лайка', 'лайків'])}
      </div>
    </div>
  );
};

export default LikesCounter;
