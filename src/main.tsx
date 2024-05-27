import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');
  return worker.start();
}

enableMocking().then();

const root = document.getElementById('root');

root &&
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
