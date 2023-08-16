import { Delete } from '@mui/icons-material';
import { IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import Draggable from './../../components/utils/StrictModeDraggable';

const Task = ({ id, text, deleteTab, tab, index, handleClick }) => {
  const isXS = useMediaQuery((theme) => theme.breakpoints.only('xs'));
  
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Stack
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            spacing={1}
            direction={'row'}
            alignItems={'center'}
            sx={{ cursor: 'pointer' }}
          >
            <Typography
              sx={{
                border: '2px solid',
                borderColor: '#777980',
                backgroundColor: '#45474E',
                p: 1,
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              color='inherit'
              onClick={isXS ? handleClick : null}
            >
              {text}
            </Typography>
            <IconButton
              onClick={() => deleteTab(id, tab)}
              aria-label='delete-button'
            >
              <Delete />
            </IconButton>
          </Stack>
        )}
      </Draggable>
    </>
  );
};

export default Task;
