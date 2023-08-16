import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import React from 'react';
import useStore from '../utils/store';

const ToasterManager = () => {
  const { toasterMsg, setToasterMsg } = useStore();

  const closeToaster = () => {
    setToasterMsg('');
  };
  return (
    <>
      <Snackbar
        open={!!toasterMsg}
        onClose={closeToaster}
        message={toasterMsg}
        autoHideDuration={2000}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={closeToaster}
          >
            <Close fontSize='small' />
          </IconButton>
        }
      />
    </>
  );
};

export default ToasterManager;
