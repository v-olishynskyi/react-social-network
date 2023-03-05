import { AppLayout } from '@components';
import {
  Community,
  Feeds,
  Login,
  Messages,
  Profile,
  Registration,
  Settings,
  ThemeSettings,
} from '@screens';
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
          path: '/',
          element: <Navigate to={'/feeds'} />,
        },
        {
          path: '/feeds',
          element: <Feeds />,
        },
        {
          path: '/community',
          element: <Community />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/settings',
          element: <Settings />,
          children: [
            { path: 'language', element: <div>language</div> },
            { path: 'blocking', element: <div>blocking</div> },
            { path: 'notifications', element: <div>notifications</div> },
            { path: 'security', element: <div>security</div> },
            { path: 'activity-log', element: <div>activity-log</div> },
            { path: 'viewing', element: <div>viewing</div> },
            { path: 'theme', element: <ThemeSettings /> },
          ],
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
      ],
    },
  ]);

  return router;
};

export default useRouter;
