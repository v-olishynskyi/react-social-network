import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from '@navigation';
import { DebugObserver } from '@services';
import { useRefreshProfile } from '@api/hooks/profile';

function App() {
  useRefreshProfile();
  const router = useRouter();

  return (
    <React.StrictMode>
      <DebugObserver />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
