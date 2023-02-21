import React from 'react';
import './App.css';
import './App.css';
import { useSetMockUsers } from '@utils/hooks';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from '@navigation';
import { DebugObserver } from '@services';

function App() {
  useSetMockUsers();

  const router = useRouter();

  return (
    <React.StrictMode>
      <DebugObserver />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
