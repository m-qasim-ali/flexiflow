import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import React, { Suspense, lazy } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AppLayout from './components/ui/AppLayout';
import Loader from './components/ui/Loader';
import ToasterManager from './components/ui/ToasterManager';
import PrivateOnlyRoute from './components/utils/PrivateOnlyRoute';
import PublicOnlyRoute from './components/utils/PublicOnlyRoute';
import { theme } from './theme';
const AuthScreen = lazy(() => import('./screens/AuthScreen/index'));
const BoardsScreen = lazy(() => import('./screens/BoardsScreen'));
const BoardScreen = lazy(() => import('./screens/BoardScreen'));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <PublicOnlyRoute Component={AuthScreen} />,
      },
      {
        path: '/boards',
        element: <PrivateOnlyRoute Component={BoardsScreen} />,
      },
      {
        path: '/board/:boardId',
        element: <PrivateOnlyRoute Component={BoardScreen} />,
      },
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <ToasterManager />
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </ConfirmProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
