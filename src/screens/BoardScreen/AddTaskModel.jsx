import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { memo, useState } from 'react';
import DialogBoxTitle from '../../components/ui/DialogBoxTitle';

const AddTaskModel = ({ status, setStatus, addTask }) => {
  const [text, setText] = useState('');

  const handleAddText = (e) => {
    e.preventDefault();
    addTask(text);
    setText('');
  };

  const handleClose = () => {
    setStatus('');
    setText('');
  };

  return (
    <>
      <Dialog
        sx={{ p: 0 }}
        fullWidth
        maxWidth={'xs'}
        open={!!status}
        onClose={handleClose}
        aria-labelledby={'add-task'}
      >
        <DialogBoxTitle title={'Add task'} handleClose={handleClose} />
        <DialogContent sx={{ py: 1, mt: 2, px: 2 }}>
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={1}>
              <Typography variant='body1' color='inherit'>
                Status:{' '}
              </Typography>
              <Chip label={status} size='small' />
            </Stack>
            <form onSubmit={handleAddText} action=''>
              <TextField
                id='taskName'
                label='Task'
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={handleAddText}
            color='primary'
            fullWidth
            variant='contained'
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(AddTaskModel);
