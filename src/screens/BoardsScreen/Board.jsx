import { useTheme } from '@emotion/react';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme';

const Board = ({ name, id, createdAt, color }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Paper
        sx={{
          backgroundColor: theme.boardBg,
          p: 2,
          borderLeft: `5px solid ${colors[color]}`,
        }}
      >
        <Stack
          direction='row'
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ m: 0 }}
        >
          <Box width={'50%'}>
            <Typography
              overflow={'hidden'}
              noWrap={true}
              textOverflow={'ellipsis'}
              sx={{ fontWeight: '400' }}
              variant='h6'
              color='inherit'
            >
              {name}
            </Typography>
          </Box>
          <IconButton
            onClick={() => navigate(`/board/${id}`)}
            size='small'
            aria-label='openCar'
          >
            <LaunchIcon />
          </IconButton>
        </Stack>
        <Typography variant='caption' color='inherit'>
          {`Created at: ${format(createdAt, 'MM/dd/yyyy, hh:mm:ss a')}`}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Board;
