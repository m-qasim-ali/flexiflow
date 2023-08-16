import React, { useEffect, useState } from 'react';
import Loader from '../../components/ui/Loader';
import useStore from '../../components/utils/store';
import useApp from '../../components/utils/useApp';
import Boards from './Boards';
import TopBar from './TopBar';
import CreateBoardDialog from './createBoardDialog';

const BoardScreen = () => {
  const [isBoardModelOpen, setIsBoardModelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { areBoardFetched } = useStore();
  const { fetchBoards } = useApp();

  const openBoardModel = () => {
    setIsBoardModelOpen(true);
  };

  const closeBoardModel = () => {
    setIsBoardModelOpen(false);
  };

  useEffect(() => {
    if (!areBoardFetched) {
      fetchBoards(setLoading);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <CreateBoardDialog
        isOpen={isBoardModelOpen}
        handleClose={closeBoardModel}
      />
      <TopBar openModel={openBoardModel} />
      {loading ? <Loader /> : <Boards />}
    </>
  );
};

export default BoardScreen;
