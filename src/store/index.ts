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
  activeComponentId: UniqueIdentifier | null;
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
  setActiveComponentId: (id: UniqueIdentifier | null) => void;
  getActiveComponent: () => RenderedComponent | null;
};

const useStoreBase = createWithEqualityFn(
  devtools(
    // persist(
    immer<StoreState & StoreActions>((set, get) => ({
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

      activeComponentId: null,
      setActiveComponentId: (id) =>
        set((state: StoreState) => {
          state.activeComponentId = id;
        }),
      getActiveComponent: () => {
        const { renderedComponents, activeComponentId } = get();

        const findComponent = (
          components: RenderedComponent[]
        ): RenderedComponent | null => {
          for (const component of components) {
            if (component.id === activeComponentId) {
              return component;
            }

            if (component.children.length > 0) {
              const foundComponent = findComponent(component.children);
              if (foundComponent) {
                return foundComponent;
              }
            }
          }

          return null;
        };

        const result = findComponent(renderedComponents);

        return result;
      },
    }))
    //   { name: "openPolaris" }
    // )
  ),
  shallow
);

export const usePolarisStore = createSelectors(useStoreBase);
