import { AppLayout } from '@components';
import { Login, Registration } from '@screens';
import { isAuthenticatedSelector } from '@store/auth';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const useRouter = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  const ProtectedRoute = ({ children }: { children: any }) => {
    const location = useLocation();

    if (!isAuthenticated) {
      return <Navigate to='/login' state={{ from: location.pathname }} />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/registration',
      element: <Registration />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/profile/:id',
          element: <div>profile</div>,
        },
      ],
    },
  ]);

  return router;
};

export default useRouter;
