import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep, set as lodashSet } from "lodash-es";
import { StoreApi, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultProps } from "../defaultProps";
import addProductFormJson from "../templates/addProductForm.json" assert { type: "json" };
import settingsPageJson from "../templates/settingsPage.json" assert { type: "json" };
import {
  ComponentAcceptType,
  ComponentName,
  RenderedComponent,
  acceptComponentsMap,
  listOfComponent,
  rootComponentId,
} from "../types";
import { generateId } from "../utils/generateId";

export const enum TemplateType {
  settingsPage = "settingsPage",
  addProductForm = "addProductForm",
}

const templateMap = {
  [TemplateType.addProductForm]: addProductFormJson,
  [TemplateType.settingsPage]: settingsPageJson,
};

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

function traverse(
  node: RenderedComponent,
  callback: (node: RenderedComponent) => void,
) {
  callback(node);

  if (node.children?.length) {
    node.children.forEach((child) => {
      traverse(child, callback);
    });
  }
}

interface StoreState {
  searchComponentInput: string;
  activeComponent: RenderedComponent | null;
  isShowCodePanel: boolean;
  isBuilderMode: boolean;
  hasError: boolean;
  activeDraggableId: string | null;
  lastRenderedComponents: RenderedComponent[];
  renderedComponents: RenderedComponent[];
}

type StoreActions = {
  loadFromTemplate: (template: TemplateType) => void;
  setSearchComponentInput: (value: string) => void;
  setRenderedComponents: (value: RenderedComponent[]) => void;
  setLastRenderedComponents: (value: RenderedComponent[]) => void;
  setIsShowCodePanel: (value: boolean) => void;
  toggleShowCodePanel: () => void;
  setActiveDraggableId: (id: string | null) => void;
  setIsBuilderMode: (value: boolean) => void;
  setHasError: (value: boolean) => void;
  setActiveComponent: (component: RenderedComponent | null) => void;
  setActiveComponentPropValue: (name: string, value: any) => void;
  deleteActiveComponent: () => void;
  duplicateActiveComponent: () => void;
  reCover: () => void;
  reset: () => void;

  // DnD stuff
  handleDragEnd: (event: DragEndEvent) => void;
};

export const findComponentBy = (
  value: RenderedComponent[],
  predicate: (component: RenderedComponent) => boolean,
): undefined | null | RenderedComponent => {
  for (const component of value) {
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
        loadFromTemplate: (template) =>
          set((state: StoreState) => {
            const loadedTemplate = templateMap[template];

            if (loadedTemplate) {
              state.lastRenderedComponents = cloneDeep(
                state.renderedComponents,
              );
              // @ts-ignore
              state.renderedComponents = loadedTemplate;
            }
          }),
        hasError: false,
        setHasError: (value) =>
          set((state: StoreState) => {
            state.hasError = value;
          }),
        searchComponentInput: "",
        setSearchComponentInput: (value) =>
          set((state: StoreState) => {
            state.searchComponentInput = value;
          }),

        setRenderedComponents: (value) =>
          set((state: StoreState) => {
            state.renderedComponents = value;
          }),
        setLastRenderedComponents: (value) =>
          set((state: StoreState) => {
            state.lastRenderedComponents = value;
          }),
        reset: () => {
          set((state: StoreState) => {
            state.activeComponent = null;
            state.renderedComponents = [];
            state.lastRenderedComponents = [];
          });
        },
        reCover: () => {
          set((state: StoreState) => {
            state.activeComponent = null;
            state.renderedComponents = cloneDeep(state.lastRenderedComponents);
            state.hasError = false;
          });
        },
        isShowCodePanel: false,
        setIsShowCodePanel: (value: boolean) =>
          set((state: StoreState) => {
            state.isShowCodePanel = value;
          }),
        toggleShowCodePanel: () =>
          set((state: StoreState) => {
            state.isShowCodePanel = !state.isShowCodePanel;
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
        lastRenderedComponents: [],

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

        duplicateActiveComponent: () =>
          set((state: StoreState) => {
            if (!state.activeComponent) {
              return;
            }
            const clonedComponent = cloneDeep(state.activeComponent);

            traverse(clonedComponent, (node) => {
              node.id = generateId();
            });

            const containerComponent = findComponentBy(
              state.renderedComponents,
              (component) =>
                component.children.some(
                  (child) => child.id === state.activeComponent?.id,
                ),
            );

            if (containerComponent) {
              containerComponent.children.push(clonedComponent);
              return;
            }

            // If the containerComponent is null, it means that the activeComponent is from top level components
            state.renderedComponents.push(clonedComponent);
          }),

        // DnD stuff
        handleDragEnd: (event) =>
          set((state: StoreState) => {
            const { active, over } = event;
            const activeId = active.id;
            const overId = over?.id;

            if (activeId === overId || !overId || state.hasError) {
              return;
            }

            state.activeDraggableId = null;
            state.lastRenderedComponents = cloneDeep(state.renderedComponents);

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
              state.activeComponent = component;
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
              state.activeComponent = component;
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
              state.activeComponent = component;
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
