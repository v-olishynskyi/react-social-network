import usePostService from '@api/services/Post';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@utils/types';

export const useUnlikePost = () => {
  const { unlikePost } = usePostService();

  return useMutation<any, ApiError, string>({
    mutationFn: unlikePost,
  });
};
