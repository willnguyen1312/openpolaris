import { useHotkeys } from "react-hotkeys-hook";

const keyLookup = {
  DELETE_NODE: "Backspace, del",
  UNDO: "ctrl+z, command+z",
  REDO: "ctrl+y, cmd+y",
  UNSELECT: "esc",
  DUPLICATE: "ctrl+d, command+d",
};

const useShortcuts = () => {
  const deleteNode = () => { };

  const onUnselect = () => { };

  const onDuplicate = () => { };

  const undo = () => { };

  const redo = () => { };

  useHotkeys(keyLookup.DELETE_NODE, deleteNode);
  useHotkeys(keyLookup.UNDO, undo);
  useHotkeys(keyLookup.REDO, redo);
  useHotkeys(keyLookup.UNSELECT, onUnselect);
  useHotkeys(keyLookup.DUPLICATE, onDuplicate);
};

export default useShortcuts;
