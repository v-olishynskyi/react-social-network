import usePostService from '@api/services/Post';
import { useToastContext } from '@context';
import postsAtom from '@store/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@utils/types';
import { useSetRecoilState } from 'recoil';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { deletePost } = usePostService();
  const { showToast } = useToastContext();

  const setPosts = useSetRecoilState(postsAtom);

  return useMutation<void, ApiError, string>({
    mutationFn: deletePost,
    onSuccess: (_, uid) => {
      console.log('file: useDeletePost.ts:18 - useDeletePost - uid:', uid);
      setPosts(prev => [...prev.filter(post => post.uid !== uid)]);
      queryClient.refetchQueries(['posts']);
    },
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
  });
};
