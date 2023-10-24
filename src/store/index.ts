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
  isBuilderMode: boolean;
  activeDraggableId: string | null;
  renderedComponents: RenderedComponent[];
}

type StoreActions = {
  setTree: (tree: RenderedComponent[]) => void;
  setIsShowCodePanel: (value: boolean) => void;
  setActiveDraggableId: (id: string | null) => void;
  setIsBuilderMode: (value: boolean) => void;
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
        setIsShowCodePanel: (value: boolean) =>
          set((state: StoreState) => {
            state.isShowCodePanel = value;
          }),

        isBuilderMode: false,
        setIsBuilderMode: (value: boolean) =>
          set((state: StoreState) => {
            state.isBuilderMode = value;
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
            const overComponent = findComponentBy(
              state.renderedComponents,
              (component) => component.id === overId,
            );

            const overComponentInsideActiveComponent = findComponentBy(
              activeComponent?.children || [],
              (component) => component.id === overId,
            );

            if (overComponentInsideActiveComponent) {
              console.info("You cannot drag a component inside itself");
              return;
            }

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

            const canOverComponentHaveChildren =
              acceptComponentsMap[overComponent?.componentName as ComponentName]
                ?.type === ComponentAcceptType.Parent;

            if (canOverComponentHaveChildren) {
              overContainer = overComponent;
            }

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

            // Case drag from the menu to the canvas, not on top of any component
            if (isComponentFromMenu && isOverCanvas) {
              console.info(
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

            // Case drag from the menu to the canvas, on top of the root components that cannot have children
            if (
              isComponentFromMenu &&
              isOverRootComponents &&
              overContainerCannotHaveChildren
            ) {
              console.info(
                "drag from menu to canvas, on top of the root components that cannot have children",
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

            // Case drag from the menu to the parent component that can have children
            if (isComponentFromMenu && overContainer) {
              console.info(
                "drag from menu to the parent component that can have children",
              );

              const component = {
                children: [],
                id: generateId(),
                componentName: activeId as ComponentName,
                props: defaultProps[activeId as ComponentName],
              };

              let newIndex = overContainer.children.findIndex(
                (component) => component.id === overId,
              );

              newIndex =
                newIndex === -1 ? overContainer.children.length : newIndex;

              overContainer.children.splice(newIndex, 0, component);
              return;
            }

            // Case drag from the canvas to the component
            if (
              state.renderedComponents.some(
                (component) => component.id === activeId,
              ) &&
              overContainer &&
              activeComponent
            ) {
              console.info("drag from canvas to component");

              const canHaveAnyChildren =
                acceptComponentsMap[overContainer.componentName]?.type ===
                ComponentAcceptType.Parent;

              if (canHaveAnyChildren) {
                let index = overContainer.children.findIndex(
                  (component) => component.id === overId,
                );
                index = index === -1 ? overContainer.children.length : index;
                overContainer.children.splice(index, 0, activeComponent);
                state.renderedComponents = state.renderedComponents.filter(
                  (component) => component.id !== activeId,
                );
                return;
              }
            }

            // Case drag from the canvas to the canvas
            if (
              state.renderedComponents.some(
                (component) => component.id === activeId,
              ) &&
              state.renderedComponents.some(
                (component) => component.id === overId,
              )
            ) {
              console.info("drag from canvas to canvas");

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

            // Case drag from the component to the canvas
            if (isOverCanvas && activeContainer) {
              console.info("drag from component to canvas");

              const index = activeContainer.children.findIndex(
                (component) => component.id === activeId,
              );

              state.renderedComponents.push(activeContainer.children[index]);
              activeContainer.children.splice(index, 1);
              return;
            }

            // Case drag inside the same parent component
            if (activeContainer && activeContainer === overContainer) {
              console.info("drag inside the parent component");

              activeContainer.children = arrayMove(
                activeContainer.children,
                activeContainer.children.findIndex(
                  (component) => component.id === activeId,
                ),
                activeContainer.children.findIndex(
                  (component) => component.id === overId,
                ),
              );

              return;
            }

            // Case drag from the one parent to another parent
            if (
              activeContainer &&
              overContainer &&
              activeContainer !== overContainer
            ) {
              console.info("drag from the one parent to another parent");

              const oldIndex = activeContainer.children.findIndex(
                (component) => component.id === activeId,
              );
              let newIndex = overContainer.children.findIndex(
                (component) => component.id === overId,
              );

              newIndex =
                newIndex === -1 ? overContainer.children.length : newIndex;

              overContainer.children.splice(
                newIndex,
                0,
                activeContainer.children[oldIndex],
              );

              activeContainer.children.splice(oldIndex, 1);
              return;
            }

            // Case drag root component to canvas
            if (isOverCanvas && !activeContainer) {
              console.info("drag root component to canvas");

              const index = state.renderedComponents.findIndex(
                (component) => component.id === activeId,
              );

              state.renderedComponents = arrayMove(
                state.renderedComponents,
                index,
                state.renderedComponents.length,
              );

              return;
            }

            // ====================
            console.info("No case matched");
          }),
      })),
      { name: "openPolaris" },
    ),
  ),
  shallow,
);

export const usePolarisStore = createSelectors(useStoreBase);
