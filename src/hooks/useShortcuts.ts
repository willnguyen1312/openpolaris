import { useEffect } from "react";
import { usePolarisStore } from "../store";

export const useShortcuts = () => {
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  const deleteActiveComponent = usePolarisStore.use.deleteActiveComponent();
  const duplicateActiveComponent =
    usePolarisStore.use.duplicateActiveComponent();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { code, shiftKey } = e;

      if (
        (code === "Backspace" || code === "Delete") &&
        activeComponent &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        deleteActiveComponent();
      } else if (code === "Escape") {
        setActiveComponent(null);
      } else if (code === "KeyD" && shiftKey && activeComponent) {
        duplicateActiveComponent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeComponent]);
};
