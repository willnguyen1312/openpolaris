import { useEffect, useMemo, useRef } from "react";
import { usePolarisStore } from "../store";
import { RenderedComponent } from "../types";

export const useShortcuts = () => {
  const topbarHeightRef = useRef<string>(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--topbar-height",
    ),
  );
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const setIsShowLeftBar = usePolarisStore.use.setIsShowLeftBar();
  const setIsShowRightBar = usePolarisStore.use.setIsShowRightBar();
  const setIsShowCodePanel = usePolarisStore.use.setIsShowCodePanel();
  const setIsShowTopBar = usePolarisStore.use.setIsShowTopBar();
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const isShowLeftBar = usePolarisStore.use.isShowLeftBar();
  const isShowRightBar = usePolarisStore.use.isShowRightBar();
  const isShowTopBar = usePolarisStore.use.isShowTopBar();
  const activeComponent = usePolarisStore.use.activeComponent();
  const deleteActiveComponent = usePolarisStore.use.deleteActiveComponent();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const duplicateActiveComponent =
    usePolarisStore.use.duplicateActiveComponent();
  const undo = usePolarisStore.use.undo();
  const redo = usePolarisStore.use.redo();

  const componentListForCycle = useMemo(() => {
    const result: RenderedComponent[] = [];
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
      const { code, ctrlKey, shiftKey } = e;

      const isInputFocused = document.activeElement?.tagName === "INPUT";

      if (isInputFocused) {
        return;
      }

      if ((code === "Backspace" || code === "Delete") && activeComponent) {
        deleteActiveComponent();
      } else if (code === "Escape") {
        setActiveComponent(null);
      } else if (code === "KeyD" && activeComponent) {
        e.preventDefault();
        duplicateActiveComponent();
      } else if (code === "KeyZ" && ctrlKey && !shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (code === "KeyY" && ctrlKey) ||
        (shiftKey && ctrlKey && code === "KeyZ")
      ) {
        e.preventDefault();
        redo();
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
      } else if (code === "Backquote" && ctrlKey) {
        e.preventDefault();
        setIsShowCodePanel(!isShowCodePanel);
      } else if (code === "Digit1" && ctrlKey) {
        e.preventDefault();
        setIsShowLeftBar(!isShowLeftBar);
      } else if (code === "Digit2" && ctrlKey) {
        e.preventDefault();
        setIsShowRightBar(!isShowRightBar);
      } else if (code === "Digit3" && ctrlKey) {
        e.preventDefault();
        const newShowTopBar = !isShowTopBar;
        setIsShowTopBar(newShowTopBar);

        if (newShowTopBar) {
          document.documentElement.style.setProperty(
            "--topbar-height",
            topbarHeightRef.current,
          );
        } else {
          topbarHeightRef.current = getComputedStyle(
            document.documentElement,
          ).getPropertyValue("--topbar-height");
          document.documentElement.style.setProperty("--topbar-height", "0px");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeComponent,
    isShowCodePanel,
    isShowLeftBar,
    isShowRightBar,
    isShowTopBar,
  ]);
};
