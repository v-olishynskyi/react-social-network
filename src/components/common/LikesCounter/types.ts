export type LikesCounterProps = {
  isLiked: boolean;
  likeCount: number;
  onClick: (action: 'like' | 'unlike') => void;
  classes?: string;
};
