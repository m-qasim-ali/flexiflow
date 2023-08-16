import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme';

const BoardTopBar = ({ name, color, lastUpdated, handleDeleteBoard }) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        sx={{ borderBottom: '5px solid', borderColor: `${colors[color]}` }}
        position='static'
        color='primary'
      >
        <Toolbar>
          <Stack
            sx={{ width: '100%' }}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            spacing={5}
          >
            <Stack
              direction={'row'}
              sx={{ width: { xs: '60%', sm: '50%' } }}
              alignItems={'center'}
              spacing={2}
            >
              <IconButton
                aria-label='back-button'
                onClick={() => navigate('/boards')}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                textOverflow={'ellipsis'}
                overflow={'hidden'}
                noWrap={true}
                variant='h6'
                color='inherit'
              >
                {name}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography
                display={{ xs: 'none', sm: 'block' }}
                variant='body2'
                color='inherit'
              >
                {`Last updated: ${format(
                  lastUpdated,
                  'MM/dd/yyyy, hh:mm:ss a'
                )}`}
              </Typography>
              <IconButton aria-label='deletBoard' onClick={handleDeleteBoard}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default BoardTopBar;
