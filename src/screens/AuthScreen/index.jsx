import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo';
import useStore from '../../components/utils/store';

const AuthScreen = () => {
  const [credientials, setCredientials] = useState({
    email: '',
    password: '',
  });
  const { isLogin, setToasterMsg } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);
  const navigate = useNavigate();
  const authValue = haveAccount
    ? 'Do not have an account?'
    : 'Already have an account?';

  const handleCredientialsChange = (e) => {
    setCredientials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    try {
      setIsLoading(true);
      if (haveAccount) {
        await signInWithEmailAndPassword(
          auth,
          credientials.email,
          credientials.password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          credientials.email,
          credientials.password
        );
      }
    } catch (err) {
      setToasterMsg(err.code.split('/')[1].split('-').join(' '));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/boards');
    }
  }, []);

  return (
    <>
      <Container maxWidth='xs'>
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={5}
        >
          <Logo width={230} height={'100%'} />
          <Typography
            variant='body1'
            textAlign={'center'}
            my={4}
            color='rgba(255,255,255,0.6)'
          >
            Visualize Your Workflow for Increased Productivity.
            <br />
            Access Your Tasks Anytime, Anywhere
          </Typography>

          <Stack
            sx={{ width: '100%' }}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            spacing={2}
            mt={3}
          >
            <TextField
              id='email'
              label='Email'
              name='email'
              type='email'
              value={credientials.email}
              onChange={handleCredientialsChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              id='password'
              label='Password'
              name='password'
              type='password'
              value={credientials.password}
              onChange={handleCredientialsChange}
              variant='outlined'
              fullWidth
            />
            <Button
              sx={{ fontWeight: 'bold' }}
              fullWidth
              variant='contained'
              size='large'
              color='primary'
              disabled={
                isLoading || !credientials.email || !credientials.password
              }
              onClick={handleSubmit}
            >
              {haveAccount ? 'Login' : 'Register'}
            </Button>

            <Typography
              sx={{ cursor: 'pointer' }}
              variant='body1'
              color='inherit'
              onClick={() => setHaveAccount((o) => !o)}
            >
              {authValue}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default AuthScreen;
