import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set) => (
  {
    isLoading: true,
    isLoggedIn: false,
    areBoardFetched: false,
    boards: [],
    toasterMsg: '',
    setToasterMsg: (msg) => set({ toasterMsg: msg }),
    setBoards: (boards) => set({ boards, areBoardFetched: true }),
    addBoard: (board) => set(prev => ({ boards: [board, ...prev.boards] })),
    setLoginStatus: (status) => set({
      isLoading: false,
      isLoggedIn: status,
      boards: [],
      areBoardFetched: false
    }, false, "setLoginStatus"),
  }
)

const useStore = create(devtools(store));

export default useStore;