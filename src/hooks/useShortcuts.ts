import { useEffect, useMemo } from "react";
import { usePolarisStore } from "../store";
import { RenderedComponent } from "../types";

export const useShortcuts = () => {
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  const deleteActiveComponent = usePolarisStore.use.deleteActiveComponent();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const duplicateActiveComponent =
    usePolarisStore.use.duplicateActiveComponent();

  const componentListForCycle = useMemo(() => {
    const result: RenderedComponent[] = [];
    // DFS
    function dfs(node: RenderedComponent) {
      result.push(node);

      if (node.children) {
        node.children.forEach((child) => {
          dfs(child);
        });
      }
    }

    renderedComponents.forEach((component) => {
      dfs(component);
    });

    return result;
  }, [renderedComponents]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { code, shiftKey } = e;

      const isInputFocused = document.activeElement?.tagName === "INPUT";

      if (isInputFocused) {
        return;
      }

      if ((code === "Backspace" || code === "Delete") && activeComponent) {
        deleteActiveComponent();
      } else if (code === "Escape") {
        setActiveComponent(null);
      } else if (code === "KeyD" && shiftKey && activeComponent) {
        duplicateActiveComponent();
      } else if (code === "ArrowUp" && activeComponent) {
        e.preventDefault();
        const index = componentListForCycle.findIndex(
          (component) => component.id === activeComponent.id,
        );
        const nextIndex =
          (index - 1 + componentListForCycle.length) %
          componentListForCycle.length;
        setActiveComponent(componentListForCycle[nextIndex]);
      } else if (code === "ArrowDown" && activeComponent) {
        e.preventDefault();
        const index = componentListForCycle.findIndex(
          (component) => component.id === activeComponent.id,
        );
        const nextIndex = (index + 1) % componentListForCycle.length;
        setActiveComponent(componentListForCycle[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeComponent]);
};
