import { useHotkeys } from "react-hotkeys-hook";
import { usePolarisStore } from "../store";

const keyLookup = {
  DELETE: "Backspace, del",
  UNSELECT: "esc",
};

export const useShortcuts = () => {
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const deleteActiveComponent = usePolarisStore.use.deleteActiveComponent();

  const onUnselect = () => setActiveComponent(null);

  useHotkeys(keyLookup.DELETE, deleteActiveComponent);
  useHotkeys(keyLookup.UNSELECT, onUnselect);
};
