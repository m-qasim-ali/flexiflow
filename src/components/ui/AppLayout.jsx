import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { auth } from '../../firebase';
import useStore from '../utils/store';
import Loader from './Loader';

const AppLayout = () => {
  const { isLoading, setLoginStatus } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    });

    return () => unsub();
  }, []);

  if (isLoading || navigation.state == 'loading') {
    return <Loader />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};



export default AppLayout;
