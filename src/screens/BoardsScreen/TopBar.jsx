import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import Logo from '../../assets/Logo';
import useStore from '../../components/utils/store';
import { auth } from '../../firebase';

const TopBar = ({ openModel }) => {
  const { setToasterMsg } = useStore();
  const isXS = useMediaQuery((theme) => theme.breakpoints.only('xs'));
  const logout = async () => {
    try {
      const res = await signOut(auth);
    } catch (err) {
      setToasterMsg(err);
    }
  };

  return (
    <>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Logo width={150} height={'100%'} />
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              spacing={2}
            >
              {isXS ? (
                <>
                  <IconButton
                    color='primary'
                    aria-label='create board'
                    onClick={openModel}
                  >
                    <AddCircleIcon />
                  </IconButton>

                  <IconButton aria-label='logout' onClick={logout}>
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button
                    onClick={openModel}
                    variant='contained'
                    color='primary'
                  >
                    Create board
                  </Button>
                  <Button
                    onClick={logout}
                    startIcon={<LogoutIcon />}
                    variant='text'
                    color='inherit'
                  >
                    Logout
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
