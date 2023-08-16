import { Grid } from '@mui/material';
import React from 'react';
import useStore from '../../components/utils/store';
import Board from './Board';
import NoBoards from './NoBoards';

const Boards = () => {
  const { boards } = useStore();
  return (
    <>
      <Grid py={5} px={{ xs: 1.5, sm: 3 }} container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {boards.length === 0 ? (
          <NoBoards />
        ) : (
          boards.map((board) => <Board key={board.id} {...board} />)
        )}
      </Grid>
    </>
  );
};

export default Boards;
