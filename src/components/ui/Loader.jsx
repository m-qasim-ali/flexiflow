import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ width: '100%', mt: 5 }}
      >
        <CircularProgress />
      </Stack>
    </>
  );
};

export default Loader;
