import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";
import { cloneDeep, get as lodashGet, set as lodashSet } from "lodash-es";

import {
  ComponentName,
  RenderedComponent,
  parentComponentList,
} from "../../types";

import { useSortable } from "@dnd-kit/sortable";
import { omitBy } from "lodash-es";
import React from "react";
import { findComponentBy, usePolarisStore } from "../../store";
import { collectPathsHasKey } from "../../utils/object";
import styles from "./Preview.module.css";

const finalizeComponentProps = (component: RenderedComponent) => {
  // Since component.props are immutable, we need to clone it first
  // to avoid mutation on ready-only properties
  const cloned = cloneDeep(component.props);
  const result = omitBy(cloned, (value, key) => {
    if (typeof value === "string" && value === "") {
      return true;
    }

    // Special case for action prop
    if (
      typeof value === "object" &&
      /action/i.test(key) &&
      !Array.isArray(value) &&
      !value.content
    ) {
      return true;
    }

    return false;
  });

  const paths = collectPathsHasKey(result, "icon").map(
    (path: string[]) => path.join(".") + ".icon",
  );

  paths.forEach((path: string) => {
    const icon = lodashGet(result, path);

    // @ts-ignore
    const Icon = PolarisIcon[icon];
    if (Icon) {
      lodashSet(result, path, Icon);
    }
  });

  return result;
};

export const Preview = ({ component }: { component: RenderedComponent }) => {
  const { componentName } = component;

  const isParentComponent = parentComponentList.includes(componentName);

  return isParentComponent ? (
    <ComponentWithContainer component={component} />
  ) : (
    <SimpleComponent component={component} />
  );
};

// Ad-hoc skipping components for extra classes
const extraClassesSimpleComponents = new Set<ComponentName>(["Icon"]);

function SimpleComponent({ component }: { component: RenderedComponent }) {
  // @ts-ignore
  const Component = lodashGet(Polaris, component.componentName.split("."));
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const activeComponent = usePolarisStore.use.activeComponent();
  const { icon, source } = component.props;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

  const { id } = component;
  const [extraClasses, setExtraClasses] = React.useState("");

  React.useEffect(() => {
    if (!extraClassesSimpleComponents.has(component.componentName)) {
      return;
    }

    const wrapperComponent = document.getElementById(id);
    const targetComponent = wrapperComponent?.firstChild as HTMLElement;
    if (targetComponent) {
      const classes = targetComponent.className;
      setExtraClasses(classes);
    }
  }, [renderedComponents]);

  const extraProps = {};

  // @ts-ignore
  if (icon && PolarisIcon[icon]) {
    // @ts-ignore
    extraProps["icon"] = PolarisIcon[icon];
  }

  // @ts-ignore
  if (source && PolarisIcon[source]) {
    // @ts-ignore
    extraProps["source"] = PolarisIcon[source];
  }

  return (
    <DragAndDropItem
      id={id}
      component={component}
      onPointerDown={(event) => {
        event.stopPropagation();
        setActiveComponentId(component);
      }}
      className={classNames(styles.simpleWrapper, extraClasses, {
        [styles.simpleWrapperSelected]: isSelected && !isDragging,
      })}
    >
      <Component {...finalComponentProps} {...extraProps} />
    </DragAndDropItem>
  );
}

function ComponentWithContainer({
  component,
}: {
  component: RenderedComponent;
}) {
  const { id, children } = component;
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const activeComponent = usePolarisStore.use.activeComponent();
  const setActiveComponentPropValue =
    usePolarisStore.use.setActiveComponentPropValue();
  const isBuilderMode = usePolarisStore.use.isBuilderMode();
  // @ts-ignore
  const Component = lodashGet(Polaris, component.componentName.split("."));
  const isEmptyChild = !component.children.length;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

  // Add extra classes to the wrapper component for compound components
  const [extraClasses, setExtraClasses] = React.useState("");

  React.useEffect(() => {
    const parentComponent = findComponentBy(renderedComponents, (component) =>
      component.children.some((child) => child.id === id),
    );

    const isCompoundComponent =
      component.componentName.includes(".") &&
      component.componentName.includes(
        parentComponent?.componentName as string,
      );

    if (!isCompoundComponent) {
      return;
    }

    const wrapperComponent = document.getElementById(id);
    const targetComponent = wrapperComponent?.firstChild as HTMLElement;
    if (targetComponent) {
      const classes = targetComponent.className;
      setExtraClasses(classes);
    }
  }, [renderedComponents]);

  // Special handling for Modal component
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isEscape = event.key === "Escape";

      if (!isEscape) {
        return;
      }

      event.stopPropagation();
      setActiveComponentPropValue("open", false);
    };

    if (activeComponent?.componentName === "Modal") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeComponent]);

  const componentMarkup = children.length ? (
    <Component {...finalComponentProps}>
      {children.map((child) => (
        <Preview key={child.id} component={child} />
      ))}
    </Component>
  ) : (
    <Component {...finalComponentProps} />
  );

  return (
    <DragAndDropItem
      id={id}
      component={component}
      className={classNames(styles.containerWrapper, extraClasses, {
        [styles.emptyChild]: isEmptyChild,
        [styles.containerWrapperSelected]: isSelected && !isDragging,
        [styles.builderMode]: isBuilderMode,
      })}
      onPointerDown={(event) => {
        event.stopPropagation();
        setActiveComponentId(component);
      }}
    >
      {componentMarkup}
    </DragAndDropItem>
  );
}

function DragAndDropItem({
  component,
  children,
  ...props
}: {
  component: RenderedComponent;
  children: React.ReactNode;
} & React.PropsWithRef<JSX.IntrinsicElements["div"]>) {
  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: component.id,
  });

  const { className = "", ...rest } = props;
  const isParentComponent = parentComponentList.includes(
    component.componentName,
  );
  const finalClassName = classNames(className, {
    [styles.isOver]: isOver && isParentComponent,
  });

  return (
    <div
      ref={setNodeRef}
      {...rest}
      {...attributes}
      {...listeners}
      className={finalClassName}
    >
      {children}
    </div>
  );
}
