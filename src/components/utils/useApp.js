import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import useStore from './store';

const useApp = () => {
  const uid = auth.currentUser.uid;
  const docRef = collection(db, `users/${uid}/boards`);

  const { setBoards, addBoard: createNew, setToasterMsg, boards } = useStore()

  const addBoard = async (name, color) => {
    try {
      const rdoc = await addDoc(docRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });

      const docRef2 = doc(db, `users/${uid}/boardsData/${rdoc.id}`);
      await setDoc(docRef2, {
        tabs: {
          todos: [],
          inProgress: [],
          completed: []
        },
        lastUpdated: serverTimestamp()
      });
      createNew({ name, color, id: rdoc.id, createdAt: new Date() });

    } catch (err) {
      setToasterMsg("Error creating board")
      throw err;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    try {
      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() })
    }
    catch (err) {
      setToasterMsg("Error updating board data");
      throw err;
    }
  }

  const fetchBoard = async (boardId) => {
    try {
      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        return docSnap.data();
      }
      else {
        return null;
      }
    }
    catch (err) {
      setToasterMsg("Error fetching board");
      throw err;
    }
  }

  const fetchBoards = async (setLoading) => {
    try {
      const qry = query(docRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(qry)
      const boards = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate() }))
      setBoards(boards);
    } catch (err) {
      setToasterMsg("Error fetching boards")
      throw err;
    }
    finally {
      if (setLoading) {
        setLoading(false)
      }
    }
  }

  const deleteBoard = async (boardId) => {
    try {
      const docRef = doc(db, `users/${uid}/boards/${boardId}`);
      await deleteDoc(docRef);
      setBoards(boards.filter(board => board.id !== boardId));

      const docRef2 = doc(db, `users/${uid}/boardsData/${boardId}`);
      await deleteDoc(docRef2);
    }
    catch (err) {
      setToasterMsg("Error deleting baord");
      throw err;
    }
  }

  return { addBoard, fetchBoards, fetchBoard, updateBoardData, deleteBoard };
};

export default useApp;
