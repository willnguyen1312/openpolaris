import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultProps } from "../defaultProps";
import {
  ComponentName,
  RenderedComponent,
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
            state.activeComponent.props[name] = value;

            const foundComponent = findComponentBy(
              state.renderedComponents,
              (component) => component.id === state.activeComponent?.id,
            );

            if (foundComponent) {
              foundComponent.props[name] = value;
            }
          }
        });
      },

      // DnD stuff
      handleDragOver: (event) =>
        set((state: StoreState) => {
          const {
            active,
            over,
            // draggingRect
          } = event;
          const activeId = active.id;
          const overId = over?.id;

          // Find the containers
          const activeContainer = findComponentBy(
            state.renderedComponents,
            (component) => {
              return component.children.some((child) => child.id === activeId);
            },
          );

          const overContainer =
            overId === rootComponentId
              ? rootComponentId
              : findComponentBy(state.renderedComponents, (component) => {
                  return component.children.some(
                    (child) => child.id === overId,
                  );
                });

          // Drag from the menu to the canvas
          const isDragFromMenuToCanvas =
            activeContainer === null && overContainer === rootComponentId;
          if (isDragFromMenuToCanvas) {
            return;
          }
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

          // If the overContainer is null, it means that the overId is from top level components
          if (!overContainer) {
            overContainer = state.renderedComponents.find(
              (component) => component.id === overId,
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

          // Drag from one parent to another parent
          const isDragFromOneParentToAnotherParent =
            !isOverRootComponent && activeContainer.id !== overContainer.id;

          if (isDragFromOneParentToAnotherParent) {
            const componentIndex = activeContainer.children.findIndex(
              (child) => child.id === activeId,
            );
            const component = activeContainer.children[componentIndex];

            activeContainer.children.splice(componentIndex, 1);
            overContainer && overContainer.children.push(component);
            return;
          }
        }),
    })),
    //   { name: "openPolaris" }
    // )
  ),
  shallow,
);

export const usePolarisStore = createSelectors(useStoreBase);
