import useUsersService from '@api/services/Users/useUsersService';

const useProfileService = () => {
  const { getUser } = useUsersService();

  const methods = {
    refreshProfile: async (uid: string) => {
      return await getUser(uid);
    },
  };

  return methods;
};

export default useProfileService;
