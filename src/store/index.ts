import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { set as lodashSet } from "lodash-es";
import { StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultProps } from "../defaultProps";
import {
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
  setIsShowCodePanel: (showCodePanel: boolean) => void;
  setActiveDraggableId: (id: string | null) => void;
  addComponentToParent: (arg: {
    childComponentId: string;
    parentComponentId: string;
    index?: number;
  }) => void;
  setActiveComponent: (component: RenderedComponent | null) => void;
  setActiveComponentPropValue: (name: string, value: any) => void;
  reset: () => void;

  // DnD stuff
  handleDragOver: (event: DragOverEvent) => void;
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
    // persist(
    immer<StoreState & StoreActions>((set) => ({
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
      addComponentToParent: ({ childComponentId, parentComponentId }) => {
        set((state: StoreState) => {
          if (parentComponentId === rootComponentId) {
            state.renderedComponents.push({
              children: [],
              id: generateId(),
              componentName: childComponentId as ComponentName,
              props: defaultProps[childComponentId as ComponentName],
            });
          }
        });
      },

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

      // DnD stuff
      handleDragOver: (event) =>
        set((state: StoreState) => {
          const { active, over } = event;
          const activeId = active.id;
          const overId = over?.id;

          if (activeId === overId || !overId) {
            return;
          }

          // Find the containers
          const activeContainer = findComponentBy(
            state.renderedComponents,
            (component) => {
              return component.children.some((child) => child.id === activeId);
            },
          );

          let overContainer = findComponentBy(
            state.renderedComponents,
            (component) => {
              return component.children.some((child) => child.id === overId);
            },
          );

          if (overContainer) {
            const activeComponentName =
              findComponentBy(
                state.renderedComponents,
                (component) => component.id === activeId,
              )?.componentName || activeId;
            const isAcceptable = acceptComponentsMap[
              overContainer.componentName
            ]!.includes(activeComponentName as ComponentName);

            if (!isAcceptable) {
              return;
            }
          }

          // If the overContainer is null, it means that the overId is from top level components
          if (!overContainer) {
            overContainer = state.renderedComponents.find(
              (component) => component.id === overId,
            );
          }

          const isComponentFromMenu = listOfComponent.some(
            (component) => component.componentName === activeId,
          );

          if (
            isComponentFromMenu ||
            !overContainer ||
            !activeContainer ||
            overContainer.id === activeContainer?.id
          ) {
            return;
          }

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
        }),

      handleDragEnd: (event) =>
        set((state: StoreState) => {
          const {
            active,
            over,
            // draggingRect
          } = event;
          const activeId = active.id;
          const overId = over?.id;
          state.activeDraggableId = null;

          if (activeId === overId || !overId) {
            return;
          }

          const isOverRootComponent = overId === rootComponentId;
          const isComponentFromMenu = listOfComponent.some(
            (component) => component.componentName === activeId,
          );

          // Find the containers
          let activeContainer = findComponentBy(
            state.renderedComponents,
            (component) => {
              return component.children.some((child) => child.id === activeId);
            },
          );

          let overContainer = findComponentBy(
            state.renderedComponents,
            (component) => {
              return component.children.some((child) => child.id === overId);
            },
          );

          // If the overContainer is null, it means that the overId is from top level components
          if (!overContainer) {
            overContainer = state.renderedComponents.find(
              (component) => component.id === overId,
            );
          }

          if (overContainer) {
            const activeComponentName =
              findComponentBy(
                state.renderedComponents,
                (component) => component.id === activeId,
              )?.componentName || activeId;

            const isAcceptable = acceptComponentsMap[
              overContainer.componentName
            ]!.includes(activeComponentName as ComponentName);

            if (!isAcceptable) {
              return;
            }
          }

          // If the activeContainer is null, it means that the activeId is from top level components
          if (!activeContainer) {
            activeContainer = state.renderedComponents.find(
              (component) => component.id === activeId,
            );
          }

          // Drag from the menu to the canvas
          const isDragFromMenuToRootComponent =
            isComponentFromMenu && isOverRootComponent;

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

          // Drag from the menu to the parent component
          if (isComponentFromMenu && overContainer) {
            const component = {
              children: [],
              id: generateId(),
              componentName: activeId as ComponentName,
              props: defaultProps[activeId as ComponentName],
            };

            overContainer.children.push(component);
            return;
          }

          if (!activeContainer || !overContainer) {
            return;
          }

          // Drag inside the same parent
          const isDragInsideSameParent =
            !isOverRootComponent && activeContainer.id === overContainer.id;

          if (isDragInsideSameParent) {
            const list = activeContainer.children;
            const oldIndex = list.findIndex((item) => item.id === activeId);
            const newIndex = list.findIndex((item) => item.id === overId);

            activeContainer.children = arrayMove(list, oldIndex, newIndex);
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
    //   { name: "openPolaris" }
    // )
  ),
  shallow,
);

export const usePolarisStore = createSelectors(useStoreBase);
