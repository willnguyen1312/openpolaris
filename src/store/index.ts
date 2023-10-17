import { UniqueIdentifier } from "@dnd-kit/core";
import { StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultProps } from "../defaultProps";
import { ComponentName, RenderedComponent, rootComponentId } from "../types";
import { generateId } from "../utils/generateId";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
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
  activeDraggableId: UniqueIdentifier | null;
  renderedComponents: RenderedComponent[];
}

type StoreActions = {
  setIsShowCodePanel: (showCodePanel: boolean) => void;
  setActiveDraggableId: (id: UniqueIdentifier | null) => void;
  addComponentToParent: (arg: {
    childComponentId: UniqueIdentifier;
    parentComponentId: UniqueIdentifier;
    index?: number;
  }) => void;
  setActiveComponent: (component: RenderedComponent | null) => void;
  setActiveComponentPropValue: (name: string, value: any) => void;
};

const findComponentBy = (
  tree: RenderedComponent[],
  predicate: (component: RenderedComponent) => boolean
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
              (component) => component.id === state.activeComponent?.id
            );

            if (foundComponent) {
              foundComponent.props[name] = value;
            }
          }
        });
      },
    }))
    //   { name: "openPolaris" }
    // )
  ),
  shallow
);

export const usePolarisStore = createSelectors(useStoreBase);
