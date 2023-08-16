import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import Droppable from './../../components/utils/StrictModeDroppable';
import { statusMap } from './BoardInterface';
import Task from './Task';

const TaskContainer = ({
  tabStatus,
  setStatus,
  data,
  id,
  deleteTab,
  handleOpenShiftTask,
}) => {
  const tabName = statusMap[tabStatus];

  return (
    <>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Grid
            {...provided.droppableProps}
            ref={provided.innerRef}
            item
            md={4}
            xs={12}
          >
            <Box
              sx={{ backgroundColor: '#000' }}
              display={'flex'}
              flexDirection={'column'}
              p={3}
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ width: '100%' }}
              >
                <Box width={'50%'}>
                  <Typography
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    noWrap
                    fontWeight={400}
                    variant='h6'
                    color='inherit'
                  >
                    {tabName}
                  </Typography>
                </Box>
                <IconButton onClick={() => setStatus(id)} aria-label='addTask'>
                  <ControlPointOutlinedIcon fontSize='small' />
                </IconButton>
              </Stack>
              <Stack spacing={2} mt={3} direction={'column'}>
                {data?.map((tab, index) => (
                  <Task
                    deleteTab={deleteTab}
                    tab={id}
                    text={tab.text}
                    key={tab.id}
                    id={tab.id}
                    index={index}
                    handleClick={() => {
                      handleOpenShiftTask(tab.id, tab.text, tabStatus, index);
                    }}
                  />
                ))}
              </Stack>
              {provided.placeholder}
            </Box>
          </Grid>
        )}
      </Droppable>
    </>
  );
};

export default memo(TaskContainer);
