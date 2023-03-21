import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from '@navigation';
import { useRecoilValue } from 'recoil';
import { themeSelector } from '@store/ui/selectors';
import '@utils/variables.css';
import './styles.scss';
import { useAuthStateChange } from '@utils/hooks';
import { ProgressSpinner } from 'primereact/progressspinner';

const AuthLoader: React.FC = () => (
  <div className='flex flex-col items-center justify-center w-screen h-screen'>
    <ProgressSpinner />
    <p>Перевірка статуса авторизації</p>
  </div>
);

function App() {
  const router = useRouter();
  const theme = useRecoilValue(themeSelector);

  const { loading } = useAuthStateChange();

  return (
    <div className={`${theme}-theme app`}>
      <React.StrictMode>
        {/* <DebugObserver /> */}
        {loading ? <AuthLoader /> : <RouterProvider router={router} />}
      </React.StrictMode>
    </div>
  );
}

export default App;
