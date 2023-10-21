import { useEffect } from "react";
import { usePolarisStore } from "../store";

export const useShortcuts = () => {
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  const deleteActiveComponent = usePolarisStore.use.deleteActiveComponent();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.code === "Backspace" || e.code === "Delete") &&
        activeComponent &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        deleteActiveComponent();
      } else if (e.code === "Escape") {
        setActiveComponent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
