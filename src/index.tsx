import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//core
import 'primereact/resources/primereact.min.css';
//icons
import 'primeicons/primeicons.css';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContextProvider } from '@context';
import { App } from '@screens';
import PrimeReact from 'primereact/api';

const queryClient = new QueryClient();

PrimeReact.ripple = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
