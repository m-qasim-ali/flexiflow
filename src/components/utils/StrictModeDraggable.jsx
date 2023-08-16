import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const StrictModeDraggable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;
  return <Draggable {...props}>{children}</Draggable>;
};

export default StrictModeDraggable;
