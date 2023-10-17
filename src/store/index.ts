import { UniqueIdentifier } from "@dnd-kit/core";
import { StoreApi, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

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
  isShowCodePanel: boolean;
  activeDraggableId: UniqueIdentifier | null;
}

type StoreActions = {
  setIsShowCodePanel: (showCodePanel: boolean) => void;
  setActiveDraggableId: (id: UniqueIdentifier | null) => void;
};

const useStoreBase = createWithEqualityFn(
  devtools(
    persist(
      immer<StoreState & StoreActions>((set) => ({
        isShowCodePanel: false,
        activeDraggableId: null,
        setIsShowCodePanel: (showCodePanel: boolean) =>
          set((state: StoreState) => {
            state.isShowCodePanel = showCodePanel;
          }),
        setActiveDraggableId: (id) =>
          set((state: StoreState) => {
            state.activeDraggableId = id;
          }),
      })),
      { name: "openPolaris" }
    )
  ),
  shallow
);

export const usePolarisStore = createSelectors(useStoreBase);
