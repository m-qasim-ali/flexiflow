import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

import DialogBoxTitle from '../../components/ui/DialogBoxTitle';
import useStore from '../../components/utils/store';
import useApp from '../../components/utils/useApp';
import { colors } from '../../theme';

const initialState = {
  name: '',
  color: 0,
};

const CreateBoardDialog = ({ isOpen, handleClose }) => {
  const [board, setBoard] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { addBoard } = useApp();
  const { setToasterMsg } = useStore();

  const handleChange = (e) => {
    setBoard((b) => ({
      ...b,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModel = () => {
    handleClose();
    setBoard(initialState);
  };

  const createBoard = async () => {
    if (board.name.length > 20)
      return setToasterMsg("board name can't more than 20 chars");
    try {
      setLoading(true);
      await addBoard(board.name.trim(), board.color);
      closeModel();
    } catch (err) {
      setToasterMsg('Error while creating board');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModel}
        aria-labelledby={'create-board-dialog'}
        fullWidth
        maxWidth='xs'
      >
        <DialogBoxTitle title={'create Board'} handleClose={closeModel} />
        <DialogContent sx={{ px: 2 }}>
          <Stack sx={{ pt: 1 }} spacing={2} direction={'column'}>
            <TextField
              id='boardName'
              label='Board Name'
              fullWidth
              value={board.name}
              name='name'
              onChange={handleChange}
            />
            <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
              <Box>Color:</Box>
              {colors.map((cl, index) => (
                <Box
                  onClick={() =>
                    setBoard((prev) => ({ ...prev, color: index }))
                  }
                  key={index}
                  color={cl}
                  bgcolor={cl}
                  width={25}
                  borderRadius={'50%'}
                  height={25}
                  border={2}
                  sx={{
                    cursor: 'pointer',
                    border:
                      board.color == index ? `3px solid #383838` : 'inherit',
                    outline: `2px solid ${cl}`,
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={createBoard}
            color='primary'
            variant='contained'
            fullWidth
            sx={{ fontWeight: 700, fontSize: '18px' }}
            disabled={loading || board.name == ''}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBoardDialog;
