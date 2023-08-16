import { Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Loader from '../../components/ui/Loader';
import useStore from '../../components/utils/store';
import useApp from '../../components/utils/useApp';
import AddTaskModel from './AddTaskModel';
import ShiftTaskModel from './ShiftTaskModel';
import TaskContainer from './TaskContainer';

export const statusMap = {
  todos: 'Todos',
  inProgress: 'In Progress',
  completed: 'Completed',
};

const initialShiftState = {
  id: '',
  index: '',
  status: '',
  name: '',
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [addTaskto, setAddTaskto] = useState('');
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const [loading, setLoading] = useState(false);
  const { updateBoardData } = useApp();
  const { setToasterMsg } = useStore();
  const [shiftModelInfo, setShiftModelInfo] = useState(initialShiftState);

  const handleUpdateBoard = async (dClone) => {
    setLoading(true);
    await updateBoardData(boardId, dClone);
    setTabs(dClone);
    updateLastUpdated();
    setToasterMsg('Board updated!');
  };

  const updateTabs = useCallback(
    async (text) => {
      if (text.trim().length === 0)
        return setToasterMsg('Task cannot be empty!');
      const dClone = structuredClone(tabs);
      dClone[addTaskto].unshift({ id: crypto.randomUUID(), text: text });
      try {
        await handleUpdateBoard(dClone);
        setAddTaskto('');
      } catch (err) {
        setToasterMsg("Error while updating board")
      } finally {
        setLoading(false);
      }
    },
    [tabs, addTaskto]
  );

  const deleteTab = useCallback(
    async (tabID, tabStatus) => {
      const dClone = structuredClone(tabs);
      const targetIndex = dClone[tabStatus].find((tab) => tabID === tab.id);
      dClone[tabStatus].splice(targetIndex, 1);
      try {
        await handleUpdateBoard(dClone);
      } catch (err) {
        setToasterMsg("Error while deleting task")
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );

  const handleDnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const dClone = structuredClone(tabs);

    // remove
    const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);

    // add
    dClone[destination.droppableId].splice(destination.index, 0, draggedTask);

    try {
      await handleUpdateBoard(dClone);
    } catch (err) {
      setToasterMsg('Error while dragging and droping task')
    } finally {
      setLoading(false);
    }
  };

  const closeShiftTaskModel = () => {
    setShiftModelInfo(initialShiftState);
  };

  const handleOpenShiftTask = (id, name, status, index) => {
    setShiftModelInfo({
      id,
      name,
      index,
      status,
    });
  };

  const handleShiftTask = async (shiftStatus) => {
    if (shiftStatus === shiftModelInfo.status) return null;

    setLoading(false);
    const dClone = structuredClone(tabs);
    const targetedInd = dClone[shiftModelInfo.status].find(
      (task) => task.id === shiftModelInfo.id
    );
    // remove
    dClone[shiftModelInfo.status].splice(targetedInd, 1);
    // add
    dClone[shiftStatus].unshift(targetedInd);

    try {
      await handleUpdateBoard(dClone);
    } catch (err) {
      setToasterMsg("Error while shifting task")
    } finally {
      setLoading(false);
      setShiftModelInfo(initialShiftState);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AddTaskModel
        addTask={updateTabs}
        status={addTaskto}
        setStatus={setAddTaskto}
      />
      {!!shiftModelInfo.name && (
        <ShiftTaskModel
          handleShiftTask={handleShiftTask}
          handleClose={closeShiftTaskModel}
          {...shiftModelInfo}
        />
      )}

      <DragDropContext onDragEnd={handleDnd}>
        <Grid
          py={4}
          px={{ xs: 1.5, sm: 3 }}
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {Object.keys(statusMap).map((tab, index) => (
            <TaskContainer
              key={index}
              tabStatus={tab}
              id={tab}
              setStatus={setAddTaskto}
              data={tabs[tab]}
              deleteTab={deleteTab}
              handleOpenShiftTask={handleOpenShiftTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
