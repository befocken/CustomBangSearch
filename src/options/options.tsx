import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import TopBar from './components/TopBar';
import { getBangs, getDefaultBangs, BangsType } from '../lib/bangs';
import BangsTable from './components/BangsTable';

function objectIsEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

function App(): React.ReactElement {
  const [bangs, setBangs] = useState<BangsType>({});
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    // Async useEffect: https://stackoverflow.com/a/53572588/6396652
    async function effect(): Promise<void> {
      const savedBangs: BangsType = await getBangs();
      if (objectIsEmpty(savedBangs)) {
        const defaultBangs = await getDefaultBangs();
        setBangs(defaultBangs);
      } else {
        setBangs(savedBangs);
      }
    }
    effect();
  }, []);

  return (
    <>
      <TopBar bangs={bangs} setBangs={setBangs} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
      <BangsTable bangs={bangs} setBangs={setBangs} setUnsavedChanges={setUnsavedChanges} />
      <Toaster />
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
