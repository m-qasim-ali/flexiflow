import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

const DialogBoxTitle = ({ title, handleClose }) => {
  return (
    <>
      <DialogTitle sx={{ p: 2 }} id={'create-board-dialog'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant='h6' color='inherit'>
            {title}
          </Typography>
          <IconButton aria-label='close-dialog' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
    </>
  );
};

export default DialogBoxTitle;
