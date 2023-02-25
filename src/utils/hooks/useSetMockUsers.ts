import { users as mockedUsers } from '@mock';
import usersAtom from '@store/users';
import React from 'react';
import { useRecoilState } from 'recoil';

export const useSetMockUsers = () => {
  const [users, setUsers] = useRecoilState(usersAtom);

  React.useEffect(() => {
    if (users.length) return;

    setUsers(mockedUsers);
  }, [users.length, setUsers]);
};
