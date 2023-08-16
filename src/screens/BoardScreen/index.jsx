import { useConfirm } from 'material-ui-confirm';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import NotReady from '../../components/ui/NotReady';
import useStore from '../../components/utils/store';
import useApp from '../../components/utils/useApp';
import BoardInterface from './BoardInterface';
import BoardTopBar from './BoardTopBar';

const BoardScreen = () => {
  const { boardId } = useParams();
  const { boards, areBoardFetched } = useStore();
  const board = useMemo(() => boards.find((bd) => bd.id === boardId), []);
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchBoard, deleteBoard } = useApp();
  const boardData = useMemo(() => data, [data]);
  const confirm = useConfirm();

  const handleFetchBoard = async () => {
    try {
      const res = await fetchBoard(boardId);
      if (res) {
        setLastUpdated(res.lastUpdated.toDate());
        setData(res.tabs);
      }
    } catch (err) {
      setToastMsg('Error while fetching board');
    } finally {
      setLoading(false);
    }
  };

  const updateLastUpdated = useCallback(() => {
    let date = new Date();
    setLastUpdated(date);
  }, []);

  const handleDeleteBoard = useCallback(async () => {
    try {
      await confirm({
        title: 'Delete',
        description: `Are you sure you want to delete this board?`,
        confirmationButtonProps: {
          autoFocus: true,
          color: 'primary',
          variant: 'contained',
        },
        cancellationButtonProps: { variant: 'outlined', color: 'primary' },
      });
      setLoading(true);
      await deleteBoard(boardId);
      navigate('/boards');
    } catch (err) {
      setToastMsg('Error while deleting board');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!areBoardFetched || !board) {
      navigate('/boards');
    } else {
      handleFetchBoard();
    }
  }, []);

  if (!board) return null;
  if (loading) return <Loader />;
  if (!data) return <NotReady />;

  return (
    <>
      <BoardTopBar
        lastUpdated={lastUpdated}
        color={board.color}
        name={board.name}
        handleDeleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        updateLastUpdated={updateLastUpdated}
        boardData={boardData}
        boardId={boardId}
      />
    </>
  );
};

export default BoardScreen;
