import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep, set as lodashSet, debounce } from "lodash-es";
import { StoreApi, UseBoundStore } from "zustand";
import {
  devtools,
  persist,
  createJSONStorage,
  StateStorage,
} from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultProps } from "../defaultProps";
import addProductFormJson from "../templates/addProductForm.json";
import settingsPageJson from "../templates/settingsPage.json";
import {
  ComponentAcceptType,
  ComponentName,
  RenderedComponent,
  acceptComponentsMap,
  listOfComponent,
  parentComponentList,
  rootComponentId,
  singleComponentList,
} from "../types";
import { generateId } from "../utils/generateId";

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

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
  isShowLeftBar: boolean;
  isShowRightBar: boolean;
  isShowTopBar: boolean;
  isSuccinctCode: boolean;
  isBuilderMode: boolean;
  isKeyboardShortcutsModalOpen: boolean;
  isHoldShift: boolean;
  isHoldAlt: boolean;
  activeDraggableId: string | null;
  renderedComponents: RenderedComponent[];
  undoStack: RenderedComponent[][];
  redoStack: RenderedComponent[][];
  selectingComponents: RenderedComponent[];
}

type StoreActions = {
  setSelectingComponent: (value: RenderedComponent[]) => void;
  undo: () => void;
  redo: () => void;
  loadFromTemplate: (template: TemplateType) => void;
  setSearchComponentInput: (value: string) => void;
  setRenderedComponents: (value: RenderedComponent[]) => void;
  setIsShowCodePanel: (value: boolean) => void;
  setIsShowLeftBar: (value: boolean) => void;
  setIsShowRightBar: (value: boolean) => void;
  setIsShowTopBar: (value: boolean) => void;
  setIsSuccinctCode: (value: boolean) => void;
  setIsKeyboardShortcutsModalOpen: (value: boolean) => void;
  setActiveDraggableId: (id: string | null) => void;
  setIsBuilderMode: (value: boolean) => void;
  setIsHoldShift: (value: boolean) => void;
  setIsHoldAlt: (value: boolean) => void;
  setActiveComponent: (component: RenderedComponent | null) => void;
  setActiveComponentPropValue: (name: string, value: any) => void;
  deleteActiveComponent: () => void;
  duplicateActiveComponent: () => void;
  moveComponent: (direction: "up" | "down") => void;
  reset: () => void;
  changeActiveComponent: (
    newComponentName: RenderedComponent["componentName"],
  ) => void;

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

const _allDo = (state: StoreState) => {
  state.undoStack.push(cloneDeep(state.renderedComponents));
  state.redoStack = [];
};

const allDo = debounce(_allDo, 1000, { leading: true });

const useStoreBase = createWithEqualityFn(
  devtools(
    persist(
      immer<StoreState & StoreActions>((set) => ({
        selectingComponents: [],
        setSelectingComponent: (value) => {
          set((state: StoreState) => {
            if (value.length === 0) {
              state.selectingComponents = [];
              return;
            }
            const idSet = new Set(value.map((item) => item.id));
            const finalValue: RenderedComponent[] = [];

            value.forEach((item) => {
              const parentComponent = findComponentBy(
                state.renderedComponents,
                (component) => {
                  return component.children.some(
                    (child) => child.id === item.id,
                  );
                },
              );

              if (!parentComponent || !idSet.has(parentComponent.id)) {
                finalValue.push(item);
              }
            });

            state.selectingComponents = finalValue;
          });
        },
        isHoldShift: false,
        setIsHoldShift: (value) =>
          set((state: StoreState) => {
            state.isHoldShift = value;
          }),
        isHoldAlt: false,
        setIsHoldAlt: (value) =>
          set((state: StoreState) => {
            state.isHoldAlt = value;
          }),
        moveComponent: (direction) =>
          set((state: StoreState) => {
            if (!state.activeComponent) {
              return;
            }

            allDo(state);
            let parentComponent = findComponentBy(
              state.renderedComponents,
              (component) =>
                component.children.some(
                  (child) => child.id === state.activeComponent?.id,
                ),
            );
            const childrenList = parentComponent
              ? parentComponent.children
              : state.renderedComponents;
            const index = childrenList.findIndex(
              (child) => child.id === state.activeComponent?.id,
            );
            const newIndex = direction === "up" ? index - 1 : index + 1;
            if (newIndex < 0) {
              childrenList.push(childrenList.splice(index, 1)[0]);
            } else if (newIndex >= childrenList.length) {
              childrenList.unshift(childrenList.splice(index, 1)[0]);
            } else {
              childrenList.splice(
                newIndex,
                0,
                childrenList.splice(index, 1)[0],
              );
            }
          }),
        isKeyboardShortcutsModalOpen: false,
        setIsKeyboardShortcutsModalOpen: (value) =>
          set((state: StoreState) => {
            state.isKeyboardShortcutsModalOpen = value;
          }),
        changeActiveComponent: (componentName) =>
          set((state: StoreState) => {
            if (state.activeComponent) {
              allDo(state);

              const isParentComponent =
                parentComponentList.includes(componentName);

              const newComponent = {
                children: isParentComponent
                  ? state.activeComponent.children
                  : [],
                id: state.activeComponent.id,
                componentName,
                props: cloneDeep(defaultProps[componentName]),
              };

              const oldComponentProps = state.activeComponent.props;
              for (const key in newComponent.props) {
                if (oldComponentProps[key] && key !== "children") {
                  newComponent.props[key] = oldComponentProps[key];
                }
              }

              if (!isParentComponent) {
                newComponent.props.children = oldComponentProps.children;
              }

              state.activeComponent = newComponent;
              const parentComponent = findComponentBy(
                state.renderedComponents,
                (component) =>
                  component.children.some(
                    (child) => child.id === state.activeComponent?.id,
                  ),
              );

              if (parentComponent) {
                const index = parentComponent.children.findIndex(
                  (child) => child.id === state.activeComponent?.id,
                );
                parentComponent.children[index] = newComponent;
                return;
              }

              // Root component
              state.renderedComponents = state.renderedComponents.map(
                (component) =>
                  component.id === state.activeComponent?.id
                    ? newComponent
                    : component,
              );
            }
          }),
        undoStack: [],
        undo: () =>
          set((state: StoreState) => {
            if (state.undoStack.length === 0) {
              return;
            }
            state.redoStack.push(cloneDeep(state.renderedComponents));
            state.renderedComponents = cloneDeep(state.undoStack.pop()) || [];
          }),
        redoStack: [],
        redo: () =>
          set((state: StoreState) => {
            if (state.redoStack.length === 0) {
              return;
            }

            state.undoStack.push(cloneDeep(state.renderedComponents));
            state.renderedComponents = cloneDeep(state.redoStack.pop()) || [];
          }),
        loadFromTemplate: (template) =>
          set((state: StoreState) => {
            const loadedTemplate = templateMap[template];

            if (loadedTemplate) {
              allDo(state);
              state.renderedComponents = loadedTemplate as RenderedComponent[];
            }
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
        reset: () => {
          set((state: StoreState) => {
            state.activeComponent = null;
            state.renderedComponents = [];
            state.selectingComponents = [];
            state.isShowLeftBar = true;
            state.isShowRightBar = true;
            state.isShowTopBar = true;
            state.undoStack = [];
            state.redoStack = [];
          });
        },
        isShowCodePanel: false,
        setIsShowCodePanel: (value: boolean) =>
          set((state: StoreState) => {
            state.isShowCodePanel = value;
          }),
        isShowLeftBar: true,
        setIsShowLeftBar: (value: boolean) =>
          set((state: StoreState) => {
            state.isShowLeftBar = value;
          }),
        isShowRightBar: true,
        setIsShowRightBar: (value: boolean) =>
          set((state: StoreState) => {
            state.isShowRightBar = value;
          }),
        isShowTopBar: true,
        setIsShowTopBar: (value: boolean) =>
          set((state: StoreState) => {
            state.isShowTopBar = value;
          }),

        isSuccinctCode: false,
        setIsSuccinctCode: (value: boolean) =>
          set((state: StoreState) => {
            state.isSuccinctCode = value;
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
                allDo(state);
                lodashSet(foundComponent.props, name, value);
              }
            }
          });
        },

        deleteActiveComponent: () =>
          set((state: StoreState) => {
            allDo(state);
            if (state.selectingComponents.length > 0) {
              state.selectingComponents.forEach((component) => {
                const activeComponentId = component.id;
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
              });
              state.selectingComponents = [];
            }

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
            if (
              !state.activeComponent &&
              state.selectingComponents.length === 0
            ) {
              return;
            }
            allDo(state);

            if (state.selectingComponents.length > 0) {
              state.selectingComponents.forEach((component) => {
                const clonedComponent = cloneDeep(component);

                traverse(clonedComponent, (node) => {
                  node.id = generateId();
                });

                const containerComponent = findComponentBy(
                  state.renderedComponents,
                  (child) =>
                    child.children.some((child) => child.id === component.id),
                );

                if (containerComponent) {
                  const index = containerComponent.children.findIndex(
                    (child) => child.id === component.id,
                  );
                  containerComponent.children.splice(index, 0, clonedComponent);
                  return;
                }

                // If the containerComponent is null, it means that the activeComponent is from top level components
                state.renderedComponents.push(clonedComponent);
              });
              return;
            }

            if (state.activeComponent) {
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
                const index = containerComponent.children.findIndex(
                  (component) => component.id === state.activeComponent?.id,
                );
                containerComponent.children.splice(index, 0, clonedComponent);
                return;
              }

              // If the containerComponent is null, it means that the activeComponent is from top level components
              state.renderedComponents.push(clonedComponent);
            }
          }),

        // DnD stuff
        handleDragEnd: (event) =>
          set((state: StoreState) => {
            const { active, over } = event;
            const activeId = active.id;
            const overId = over?.id;

            if (activeId === overId || !overId) {
              return;
            }

            state.activeDraggableId = null;

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

            // Case drag with shift key
            if (overContainer && state.isHoldShift) {
              allDo(state);
              console.info("drag with shift key");

              const parent = findComponentBy(state.renderedComponents, (node) =>
                node.children.some((child) => child.id === overContainer.id),
              );

              const childrenList = parent
                ? parent.children
                : state.renderedComponents;

              // Move active component to the index of the over component
              const index = childrenList.findIndex(
                (component) =>
                  component.id === overContainer.id || component.id === overId,
              );

              if (
                index !== -1 &&
                index !== undefined &&
                !activeContainer &&
                overContainer
              ) {
                const component = {
                  children: [],
                  id: generateId(),
                  componentName: activeId as ComponentName,
                  props: defaultProps[activeId as ComponentName],
                };

                state.activeComponent = component;
                if (parent) {
                  parent.children.splice(index, 0, state.activeComponent);
                } else {
                  state.renderedComponents.splice(
                    index,
                    0,
                    state.activeComponent,
                  );
                }

                return;
              }

              if (
                index !== -1 &&
                index !== undefined &&
                activeContainer &&
                overContainer
              ) {
                // Delete activeComponent in the tree
                const activeComponentParent = findComponentBy(
                  state.renderedComponents,
                  (node) =>
                    node.children.some((child) => child.id === activeId),
                );
                activeComponentParent?.children.splice(
                  activeComponentParent.children.findIndex(
                    (component) => component.id === activeId,
                  ),
                  1,
                );

                // Insert activeComponent to the index of the over component
                parent?.children.splice(
                  index,
                  0,
                  activeComponent as RenderedComponent,
                );
              }

              return;
            }

            // Case drag from the menu to the canvas, not on top of any component
            if (isComponentFromMenu && isOverCanvas) {
              allDo(state);
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
              if (state.selectingComponents.length === 0) {
                state.activeComponent = component;
              }
              return;
            }

            // Case drag from the menu to the canvas, on top of the root components that cannot have children
            if (
              isComponentFromMenu &&
              isOverRootComponents &&
              overContainerCannotHaveChildren
            ) {
              allDo(state);
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
              allDo(state);
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

              if (state.selectingComponents.length > 0) {
                allDo(state);

                state.selectingComponents.forEach((component) => {
                  let parentComponent = null;
                  for (const renderedComponent of state.renderedComponents) {
                    if (
                      renderedComponent.children.some(
                        (child) => child.id === component.id,
                      )
                    ) {
                      parentComponent = renderedComponent;
                      break;
                    }
                  }

                  if (parentComponent) {
                    parentComponent.children.splice(
                      parentComponent.children.findIndex(
                        (child) => child.id === component.id,
                      ),
                      1,
                    );
                  } else {
                    state.renderedComponents.splice(
                      state.renderedComponents.findIndex(
                        (child) => child.id === component.id,
                      ),
                      1,
                    );
                  }

                  overContainer.children.push(component);
                });

                return;
              }

              if (canHaveAnyChildren) {
                allDo(state);
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

              allDo(state);
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
              allDo(state);
              console.info("drag from component to canvas");

              const index = activeContainer.children.findIndex(
                (component) => component.id === activeId,
              );

              state.renderedComponents.push(activeContainer.children[index]);
              activeContainer.children.splice(index, 1);
              return;
            }

            // Case drag inside the same parent component
            const isACtiveComponentSimple = singleComponentList.includes(
              activeComponent?.componentName as ComponentName,
            );
            const isOverComponentSimple = singleComponentList.includes(
              overComponent?.componentName as ComponentName,
            );
            if (
              activeContainer &&
              activeContainer === overContainer &&
              isACtiveComponentSimple &&
              isOverComponentSimple
            ) {
              console.info("drag inside the parent component");

              allDo(state);

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
              allDo(state);
              console.info("drag from the one parent to another parent");

              if (state.selectingComponents.length > 0) {
                state.selectingComponents.forEach((component) => {
                  let parentComponent = null;
                  parentComponent = findComponentBy(
                    state.renderedComponents,
                    (node) => {
                      return node.children.some(
                        (child) => child.id === component.id,
                      );
                    },
                  );

                  if (parentComponent) {
                    parentComponent.children.splice(
                      parentComponent.children.findIndex(
                        (child) => child.id === component.id,
                      ),
                      1,
                    );
                  } else {
                    state.renderedComponents.splice(
                      state.renderedComponents.findIndex(
                        (child) => child.id === component.id,
                      ),
                      1,
                    );
                  }

                  overContainer.children.push(component);
                });

                state.selectingComponents = [];

                return;
              }

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
              allDo(state);
              console.info("drag root component to canvas");

              if (state.selectingComponents.length > 0) {
                state.selectingComponents.forEach((component) => {
                  let parentComponent = null;
                  for (const renderedComponent of state.renderedComponents) {
                    if (
                      renderedComponent.children.some(
                        (child) => child.id === component.id,
                      )
                    ) {
                      parentComponent = renderedComponent;
                      break;
                    }
                  }

                  if (parentComponent) {
                    parentComponent.children.splice(
                      parentComponent.children.findIndex(
                        (child) => child.id === component.id,
                      ),
                      1,
                    );
                  } else {
                    state.renderedComponents.splice(
                      state.renderedComponents.findIndex(
                        (child) => child.id === component.id,
                      ),
                      1,
                    );
                  }

                  state.renderedComponents.push(component);
                });

                return;
              }

              const index = state.renderedComponents.findIndex(
                (component) => component.id === activeId,
              );
              allDo(state);
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
      { name: "openPolaris", storage: createJSONStorage(() => storage) },
    ),
    {
      enabled: true,
    },
  ),
  shallow,
);

export const usePolarisStore = createSelectors(useStoreBase);
