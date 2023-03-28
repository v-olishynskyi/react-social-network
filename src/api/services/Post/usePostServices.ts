import { CreatePostData } from './types';
import { firebaseDB } from '@services';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useQueryClient } from '@tanstack/react-query';

export const usePostService = () => {
  const queryClient = useQueryClient();

  const methods = {
    getPosts: async () => {
      try {
        const postsRef = collection(firebaseDB, 'posts');
        const q = query(postsRef, orderBy('created_at', 'desc'));

        const docs = await getDocs(q);

        const arr: any[] = [];

        docs.forEach(async element => {
          const data = element.data();
          arr.push({ ...data });
        });

        return Promise.resolve(arr);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    createPost: async (data: CreatePostData) => {
      try {
        const postRef = await addDoc(collection(firebaseDB, 'posts'), {
          ...data,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
        const postId = postRef.id;
        await updateDoc(doc(firebaseDB, 'posts', postId), {
          uid: postId,
          updated_at: serverTimestamp(),
        });

        queryClient.refetchQueries(['posts']);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    deletePost: async (uid: string) => {
      try {
        await deleteDoc(doc(firebaseDB, 'posts', uid));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    likePost: async (postId: string) => {
      try {
        const docRef = doc(firebaseDB, 'posts', postId);
        await updateDoc(docRef, {
          likes: increment(1),
          is_liked: true,
          updated_at: Timestamp.now(),
        });

        const newDoc = await getDoc(docRef);
        if (newDoc.exists()) {
          return Promise.resolve(newDoc);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    unlikePost: async (postId: string) => {
      try {
        const docRef = doc(firebaseDB, 'posts', postId);
        await updateDoc(docRef, {
          likes: increment(-1),
          is_liked: false,
          updated_at: Timestamp.now(),
        });

        const newDoc = await getDoc(docRef);
        if (newDoc.exists()) {
          return Promise.resolve(newDoc);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };

  return methods;
};
