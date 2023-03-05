import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from '@navigation';
import { DebugObserver } from '@services';
import { useRefreshProfile } from '@api/hooks/profile';
import { useRecoilValue } from 'recoil';
import { themeSelector } from '@store/ui/selectors';
import '@utils/variables.css';
import './styles.scss';

function App() {
  useRefreshProfile();
  const router = useRouter();
  const theme = useRecoilValue(themeSelector);

  return (
    <div className={`${theme}-theme app`}>
      <React.StrictMode>
        {/* <DebugObserver /> */}
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
