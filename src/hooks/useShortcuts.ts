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
  const setIsBuilderMode = usePolarisStore.use.setIsBuilderMode();
  const setIsKeyboardShortcutsModalOpen =
    usePolarisStore.use.setIsKeyboardShortcutsModalOpen();
  const moveComponent = usePolarisStore.use.moveComponent();
  const setIsShowLeftBar = usePolarisStore.use.setIsShowLeftBar();
  const setIsShowRightBar = usePolarisStore.use.setIsShowRightBar();
  const setIsShowCodePanel = usePolarisStore.use.setIsShowCodePanel();
  const setIsShowTopBar = usePolarisStore.use.setIsShowTopBar();
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const isShowLeftBar = usePolarisStore.use.isShowLeftBar();
  const isBuilderMode = usePolarisStore.use.isBuilderMode();
  const isKeyboardShortcutsModalOpen =
    usePolarisStore.use.isKeyboardShortcutsModalOpen();
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
      const { code, shiftKey, metaKey, ctrlKey } = e;
      const hasModifierKey = metaKey || ctrlKey;

      const isInputFocused = document.activeElement?.tagName === "INPUT";

      if (isInputFocused) {
        return;
      }

      if (
        (code === "Backspace" || code === "Delete") &&
        activeComponent &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        deleteActiveComponent();
      } else if (code === "Escape" && !isKeyboardShortcutsModalOpen) {
        e.preventDefault();
        setActiveComponent(null);
      } else if (
        code === "KeyD" &&
        hasModifierKey &&
        activeComponent &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        duplicateActiveComponent();
      } else if (
        code === "KeyZ" &&
        hasModifierKey &&
        !shiftKey &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        undo();
      } else if (code === "KeyK" && hasModifierKey) {
        e.preventDefault();
        setIsKeyboardShortcutsModalOpen(!isKeyboardShortcutsModalOpen);
      } else if (
        shiftKey &&
        hasModifierKey &&
        code === "KeyZ" &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        redo();
      } else if (
        code === "KeyB" &&
        hasModifierKey &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        setIsBuilderMode(!isBuilderMode);
      } else if (
        code === "ArrowUp" &&
        !shiftKey &&
        activeComponent &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        const index = componentListForCycle.findIndex(
          (component) => component.id === activeComponent.id,
        );
        const nextIndex =
          (index - 1 + componentListForCycle.length) %
          componentListForCycle.length;
        setActiveComponent(componentListForCycle[nextIndex]);
      } else if (
        code === "ArrowDown" &&
        !shiftKey &&
        activeComponent &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        const index = componentListForCycle.findIndex(
          (component) => component.id === activeComponent.id,
        );
        const nextIndex = (index + 1) % componentListForCycle.length;
        setActiveComponent(componentListForCycle[nextIndex]);
      } else if (
        (code === "ArrowRight" || code === "ArrowDown") &&
        shiftKey &&
        activeComponent &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        moveComponent("down");
      } else if (
        (code === "ArrowLeft" || code === "ArrowUp") &&
        shiftKey &&
        activeComponent &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        moveComponent("up");
      } else if (
        (code === "Digit1" &&
          hasModifierKey &&
          !isKeyboardShortcutsModalOpen) ||
        (code === "Backquote" &&
          hasModifierKey &&
          !isKeyboardShortcutsModalOpen)
      ) {
        e.preventDefault();
        setIsShowCodePanel(!isShowCodePanel);
      } else if (
        code === "Digit2" &&
        hasModifierKey &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        setIsShowLeftBar(!isShowLeftBar);
      } else if (
        code === "Digit3" &&
        hasModifierKey &&
        !isKeyboardShortcutsModalOpen
      ) {
        e.preventDefault();
        setIsShowRightBar(!isShowRightBar);
      } else if (
        code === "Digit4" &&
        hasModifierKey &&
        !isKeyboardShortcutsModalOpen
      ) {
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
    isBuilderMode,
    isKeyboardShortcutsModalOpen,
  ]);
};
