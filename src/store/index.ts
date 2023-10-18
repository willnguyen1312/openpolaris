import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
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
) => {
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

          const isOverRootComponent = overId === rootComponentId;

          // Find the containers
          const activeContainer = findComponentBy(
            state.renderedComponents,
            (component) => {
              return component.children.some((child) => child.id === activeId);
            },
          );

          let overContainer = isOverRootComponent
            ? rootComponentId
            : findComponentBy(state.renderedComponents, (component) => {
                return component.children.some((child) => child.id === overId);
              });

          // Drag from the menu to the canvas
          const isDragFromMenuToCanvas =
            activeContainer === null && isOverRootComponent;
          if (isDragFromMenuToCanvas) {
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
          const isComponentFromMenu = listOfComponent.some(
            (component) => component.componentName === activeId,
          );

          const isAmongTopParents = overContainer === null;
          if (isComponentFromMenu && isAmongTopParents) {
            const component = {
              children: [],
              id: generateId(),
              componentName: activeId as ComponentName,
              props: defaultProps[activeId as ComponentName],
            };

            overContainer = state.renderedComponents.find((component) => {
              return component.id === overId;
            });

            overContainer?.children.push(component);
          }
        }),
    })),
    //   { name: "openPolaris" }
    // )
  ),
  shallow,
);

export const usePolarisStore = createSelectors(useStoreBase);
