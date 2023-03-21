import usePostService from '@api/services/Post';
import { CreatePostData } from '@api/services/Post/types';
import { useToastContext } from '@context';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@utils/types';

export const useCreatePost = () => {
  const { createPost } = usePostService();
  const { showToast } = useToastContext();

  return useMutation<void, ApiError, CreatePostData>({
    mutationFn: createPost,
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
  });
};
