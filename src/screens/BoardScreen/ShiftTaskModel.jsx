import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import DialogBoxTitle from '../../components/ui/DialogBoxTitle';
import { statusMap } from './BoardInterface';

const ShiftTaskModel = ({
  id,
  index,
  name,
  status,
  handleClose,
  handleShiftTask,
}) => {
  const [shiftStatus, setShiftStatus] = useState(status);


  return (
    <>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={true}
        onClose={handleClose}
        aria-labelledby={'shift task model'}
      >
        <DialogBoxTitle title='Shift Task' handleClose={handleClose} />
        <DialogContent sx={{ px: 2 }}>
          <Stack mb={3} direction={'column'} spacing={1}>
            <Typography variant='body1' color='inherit'>
              Task:
            </Typography>
            <Typography
              sx={{ p: 1.2, backgroundColor: '#45474E', display: 'block' }}
              variant='body1'
              color='inherit'
              textOverflow={'ellipsis'}
              overflow={'hidden'}
            >
              {name}
            </Typography>
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant='body1' color='inherit'>
              Status
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              {Object.entries(statusMap).map(([key, value], index) => {
                return (
                  <Chip
                    key={index} // Each element in a map should have a unique key
                    variant={key === shiftStatus ? 'filled' : 'outlined'}
                    label={value}
                    onClick={() => setShiftStatus(key)}
                  />
                );
              })}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 1.5 }}>
          <Button
            onClick={() => handleShiftTask(shiftStatus)}
            color='primary'
            fullWidth
            variant='contained'
          >
            Shift Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShiftTaskModel;
