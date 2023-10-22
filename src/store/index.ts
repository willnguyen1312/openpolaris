import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { set as lodashSet } from "lodash-es";
import { StoreApi, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultProps } from "../defaultProps";
import {
  ComponentAcceptType,
  ComponentName,
  RenderedComponent,
  acceptComponentsMap,
  listOfComponent,
  rootComponentId,
} from "../types";
import { generateId } from "../utils/generateId";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

interface StoreState {
  activeComponent: RenderedComponent | null;
  isShowCodePanel: boolean;
  activeDraggableId: string | null;
  renderedComponents: RenderedComponent[];
}

type StoreActions = {
  setTree: (tree: RenderedComponent[]) => void;
  setIsShowCodePanel: (showCodePanel: boolean) => void;
  setActiveDraggableId: (id: string | null) => void;
  setActiveComponent: (component: RenderedComponent | null) => void;
  setActiveComponentPropValue: (name: string, value: any) => void;
  deleteActiveComponent: () => void;
  reset: () => void;

  // DnD stuff
  handleDragEnd: (event: DragEndEvent) => void;
};

export const findComponentBy = (
  tree: RenderedComponent[],
  predicate: (component: RenderedComponent) => boolean,
): undefined | null | RenderedComponent => {
  for (const component of tree) {
    if (predicate(component)) {
      return component;
    } else {
      const found: any = findComponentBy(component.children, predicate);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

const useStoreBase = createWithEqualityFn(
  devtools(
    persist(
      immer<StoreState & StoreActions>((set) => ({
        setTree: (tree) =>
          set((state: StoreState) => {
            state.renderedComponents = tree;
          }),
        reset: () => {
          set((state: StoreState) => {
            state.activeComponent = null;
            state.renderedComponents = [];
          });
        },
        isShowCodePanel: false,
        setIsShowCodePanel: (showCodePanel: boolean) =>
          set((state: StoreState) => {
            state.isShowCodePanel = showCodePanel;
          }),

        activeDraggableId: null,
        setActiveDraggableId: (id) =>
          set((state: StoreState) => {
            state.activeDraggableId = id;
          }),

        renderedComponents: [],

        activeComponent: null,
        setActiveComponent: (component) =>
          set((state: StoreState) => {
            state.activeComponent = component;
          }),
        setActiveComponentPropValue: (name, value) => {
          set((state: StoreState) => {
            if (state.activeComponent) {
              lodashSet(state.activeComponent.props, name, value);

              const foundComponent = findComponentBy(
                state.renderedComponents,
                (component) => component.id === state.activeComponent?.id,
              );

              if (foundComponent) {
                lodashSet(foundComponent.props, name, value);
              }
            }
          });
        },

        deleteActiveComponent: () =>
          set((state: StoreState) => {
            const activeComponentId = state.activeComponent?.id;
            if (activeComponentId) {
              const parentComponent = findComponentBy(
                state.renderedComponents,
                (component) =>
                  component.children.some(
                    (child) => child.id === activeComponentId,
                  ),
              );

              state.activeComponent = null;
              if (parentComponent) {
                parentComponent.children = parentComponent.children.filter(
                  (child) => child.id !== activeComponentId,
                );
                return;
              }

              // If the parentComponent is null, it means that the activeComponent is from top level components
              state.renderedComponents = state.renderedComponents.filter(
                (component) => component.id !== activeComponentId,
              );
            }
          }),

        // DnD stuff
        handleDragEnd: (event) =>
          set((state: StoreState) => {
            const { active, over } = event;
            const activeId = active.id;
            const overId = over?.id;
            state.activeDraggableId = null;

            if (activeId === overId || !overId) {
              return;
            }

            const isOverCanvas = overId === rootComponentId;
            const isComponentFromMenu = listOfComponent.some(
              (component) => component.componentName === activeId,
            );
            const isOverRootComponents = state.renderedComponents.some(
              (component) => component.id === overId,
            );
            const activeComponent = findComponentBy(
              state.renderedComponents,
              (component) => component.id === activeId,
            );

            // Find the containers
            let activeContainer = findComponentBy(
              state.renderedComponents,
              (component) => {
                return component.children.some(
                  (child) => child.id === activeId,
                );
              },
            );

            let overContainer = findComponentBy(
              state.renderedComponents,
              (component) => {
                return component.children.some((child) => child.id === overId);
              },
            );

            // If the overContainer is null, it means that the overId is from container itself
            if (!overContainer) {
              overContainer = state.renderedComponents.find(
                (component) => component.id === overId,
              );
            }

            const overContainerCannotHaveChildren =
              !!overContainer &&
              acceptComponentsMap[overContainer.componentName]?.type ===
                ComponentAcceptType.Single;

            // Case : drag from the menu to the canvas, not on top of any component
            if (isComponentFromMenu && isOverCanvas) {
              console.log(
                "drag from menu to canvas, not on top of any component",
              );

              const component = {
                children: [],
                id: generateId(),
                componentName: activeId as ComponentName,
                props: defaultProps[activeId as ComponentName],
              };

              state.renderedComponents.push(component);
              return;
            }

            // Case : drag from the menu to the canvas, on top of the root components
            if (
              isComponentFromMenu &&
              isOverRootComponents &&
              overContainerCannotHaveChildren
            ) {
              console.log(
                "drag from canvas to menu, on top of root components",
              );
              const component = {
                children: [],
                id: generateId(),
                componentName: activeId as ComponentName,
                props: defaultProps[activeId as ComponentName],
              };

              const index = state.renderedComponents.findIndex(
                (item) => item.id === overId,
              );

              state.renderedComponents.splice(index, 0, component);
              return;
            }

            // Case : drag from the menu to the parent component
            if (isComponentFromMenu && overContainer) {
              console.log("drag from menu to parent component");

              const component = {
                children: [],
                id: generateId(),
                componentName: activeId as ComponentName,
                props: defaultProps[activeId as ComponentName],
              };

              const newIndex = overContainer.children.findIndex(
                (component) => component.id === overId,
              );
              overContainer.children.splice(newIndex, 0, component);
              return;
            }

            // Case : drag from the canvas to the canvas
            if (
              state.renderedComponents.some(
                (component) => component.id === activeId,
              ) &&
              state.renderedComponents.some(
                (component) => component.id === overId,
              )
            ) {
              console.log("drag from canvas to canvas");

              state.renderedComponents = arrayMove(
                state.renderedComponents,
                state.renderedComponents.findIndex(
                  (component) => component.id === activeId,
                ),
                state.renderedComponents.findIndex(
                  (component) => component.id === overId,
                ),
              );

              return;
            }

            // Case : drag from the canvas to the component
            if (
              state.renderedComponents.some(
                (component) => component.id === activeId,
              ) &&
              overContainer &&
              activeComponent
            ) {
              console.log("drag from canvas to component");
              const canHaveSpecificChildren =
                acceptComponentsMap[overContainer.componentName]?.type ===
                ComponentAcceptType.ParentWithSpecificChildren;
              const childrenList =
                acceptComponentsMap[overContainer.componentName]
                  ?.childrenList || [];

              if (
                canHaveSpecificChildren &&
                !childrenList.includes(activeComponent.componentName)
              ) {
                return;
              }

              const index = overContainer.children.findIndex(
                (component) => component.id === overId,
              );
              overContainer.children.splice(index, 0, activeComponent);
              state.renderedComponents = state.renderedComponents.filter(
                (component) => component.id !== activeId,
              );

              return;
            }

            // ====================
            // TODO: Add more cases

            // Check if the component can be dropped into the container
            if (overContainer) {
              const activeComponentName = isComponentFromMenu
                ? activeId
                : findComponentBy(
                    state.renderedComponents,
                    (component) => component.id === activeId,
                  )?.componentName;
              const component =
                acceptComponentsMap[overContainer.componentName];

              if (!component) {
                return;
              }

              const { type, childrenList = [] } = component;

              if (type === ComponentAcceptType.Single) {
                return;
              }

              if (
                type === ComponentAcceptType.ParentWithSpecificChildren &&
                !childrenList.includes(activeComponentName as ComponentName)
              ) {
                return;
              }
            }

            // Drag from the menu to the canvas
            const isDragFromMenuToRootComponent =
              isComponentFromMenu && isOverCanvas;

            if (isDragFromMenuToRootComponent) {
              const component = {
                children: [],
                id: generateId(),
                componentName: activeId as ComponentName,
                props: defaultProps[activeId as ComponentName],
              };

              state.renderedComponents.push(component);
              return;
            }

            // Drag from parent to the canvas
            if (activeContainer && isOverCanvas) {
              const list = activeContainer.children;
              const oldIndex = list.findIndex((item) => item.id === activeId);

              state.renderedComponents.push(list[oldIndex]);
              list.splice(oldIndex, 1);
              return;
            }

            // Drag from canvas to parent
            if (!activeContainer && overContainer) {
              // activeContainer is null, it means that the activeComponent is from the canvas
              activeContainer = state.renderedComponents.find(
                (component) => component.id === activeId,
              );

              const oldIndex = state.renderedComponents.findIndex(
                (item) => item.id === activeId,
              );

              const newIndex = overContainer.children.findIndex(
                (component) => component.id === overId,
              );

              overContainer.children.splice(
                newIndex,
                0,
                state.renderedComponents[oldIndex],
              );
              state.renderedComponents.splice(oldIndex, 1);
              return;
            }

            if (!overContainer || !activeContainer) {
              return;
            }

            // Drag inside the same parent
            const isDragInsideSameParent =
              !isOverCanvas && activeContainer.id === overContainer.id;

            if (isDragInsideSameParent) {
              const list = activeContainer.children;
              const oldIndex = list.findIndex((item) => item.id === activeId);
              const newIndex = list.findIndex((item) => item.id === overId);

              activeContainer.children = arrayMove(list, oldIndex, newIndex);
              return;
            }

            if (activeContainer && overContainer) {
              let newIndex: number | undefined;
              if (overId === overContainer.id) {
                newIndex = overContainer.children.length;
              } else {
                newIndex = overContainer.children.findIndex(
                  (component) => component.id === overId,
                );
              }

              const activeIndex = activeContainer.children.findIndex(
                (component) => component.id === activeId,
              );

              overContainer.children.splice(
                newIndex,
                0,
                activeContainer.children[activeIndex],
              );
              activeContainer.children.splice(activeIndex, 1);
              return;
            }

            // From the root component to itself
            const oldIndex = state.renderedComponents.findIndex(
              (item) => item.id === activeId,
            );
            const newIndex = state.renderedComponents.findIndex(
              (item) => item.id === overId,
            );

            state.renderedComponents = arrayMove(
              state.renderedComponents,
              oldIndex,
              newIndex,
            );
          }),
      })),
      { name: "openPolaris" },
    ),
  ),
  shallow,
);

export const usePolarisStore = createSelectors(useStoreBase);
