import { useHotkeys } from "react-hotkeys-hook";
import { usePolarisStore } from "../store";

const keyLookup = {
  DELETE_NODE: "Backspace, del",
  UNDO: "ctrl+z, command+z",
  REDO: "ctrl+y, cmd+y",
  UNSELECT: "esc",
  DUPLICATE: "ctrl+d, command+d",
};

export const useShortcuts = () => {
  const setActiveComponent = usePolarisStore.use.setActiveComponent();

  const deleteNode = () => {};

  const onUnselect = () => setActiveComponent(null);

  const onDuplicate = () => {};

  const undo = () => {};

  const redo = () => {};

  useHotkeys(keyLookup.DELETE_NODE, deleteNode);
  useHotkeys(keyLookup.UNDO, undo);
  useHotkeys(keyLookup.REDO, redo);
  useHotkeys(keyLookup.UNSELECT, onUnselect);
  useHotkeys(keyLookup.DUPLICATE, onDuplicate);
};
