import usePostService from '@api/services/Post';
import postsAtom from '@store/posts';
import { useQuery } from '@tanstack/react-query';
import { ApiError, Post } from '@utils/types';
import { useSetRecoilState } from 'recoil';

export const usePosts = () => {
  const { getPosts } = usePostService();
  const setPosts = useSetRecoilState(postsAtom);

  const queryKey = ['posts'];
  return useQuery<Post[], ApiError>({
    queryKey,
    queryFn: getPosts,
    onSuccess: response => {
      setPosts(() => [...response]);
    },
  });
};
