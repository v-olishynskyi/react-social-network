import { users as mockedUsers } from '@mock';
import usersAtom from '@store/users';
import React from 'react';
import { useRecoilState } from 'recoil';

export const useSetMockUsers = () => {
  const [users, setUsers] = useRecoilState(usersAtom);
  console.log('file: useSetMockUsers.ts:8 - useSetMockUsers - users:', users);

  React.useEffect(() => {
    if (users.length) return;

    setUsers(mockedUsers);
  }, [users.length, setUsers]);
};
