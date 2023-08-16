import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotReady = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ mt: 5 }}
      >
        <Typography mb={1} variant='h5' color='inherit'>
          Seems like your board is not ready
        </Typography>
        <Typography textAlign={'center'} mb={4} color='inherit'>
          Sometime it may take a few seconds for the board to be ready for use.
          <br />
          Try again in a few seconds
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          variant='contained'
          color='primary'
          onClick={() => navigate('/boards')}
        >
          Go back
        </Button>
      </Stack>
    </>
  );
};

export default NotReady;
