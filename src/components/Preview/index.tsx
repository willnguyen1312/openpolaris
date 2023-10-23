import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";
import { get as lodashGet, set as lodashSet } from "lodash-es";

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

const fitContentComponents: ComponentName[] = ["Button"];

const checkIfComponentCanBeDragged = (component: RenderedComponent) => {
  const isSimpleComponent = !parentComponentList.includes(
    component.componentName,
  );

  if (isSimpleComponent) {
    return false;
  }

  const hasNoChildren = component.children.length === 0;
  return hasNoChildren;
};

const finalizeComponentProps = (component: RenderedComponent) => {
  const result = structuredClone(
    omitBy(component.props, (value) => {
      if (typeof value === "string" && value === "") {
        return true;
      }

      // Special case for action prop
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        !value.content
      ) {
        return true;
      }

      return false;
    }),
  );

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

function SimpleComponent({ component }: { component: RenderedComponent }) {
  // @ts-ignore
  const Component = Polaris[component.componentName];
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  const icon = component.props.icon;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

  return (
    <div
      onPointerDown={(event) => {
        event.stopPropagation();
        setActiveComponentId(component);
      }}
      className={classNames(styles.simpleWrapper, {
        [styles.selected]: isSelected && !isDragging,
        [styles.fitContent]: fitContentComponents.includes(
          component.componentName,
        ),
      })}
    >
      <DragAndDropItem component={component}>
        <Component
          {...finalComponentProps}
          // @ts-ignore
          icon={icon ? PolarisIcon[icon] : undefined}
        />
      </DragAndDropItem>
    </div>
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
  const isBuilderMode = usePolarisStore.use.isBuilderMode();
  // @ts-ignore
  const Component = lodashGet(Polaris, component.componentName.split("."));
  const isEmptyChild = !component.children.length;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

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

  return (
    <DragAndDropItem
      id={id}
      key={id}
      component={component}
      className={classNames(styles.containerWrapper, extraClasses, {
        [styles.emptyChild]: isEmptyChild,
        [styles.selected]: isSelected && !isDragging,
        [styles.builderMode]: isBuilderMode,
      })}
      onPointerDown={(event) => {
        event.stopPropagation();
        setActiveComponentId(component);
      }}
    >
      <Component {...finalComponentProps}>
        {children.map((child) => (
          <Preview key={child.id} component={child} />
        ))}
      </Component>
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
    disabled: checkIfComponentCanBeDragged(component),
  });

  const style: React.CSSProperties = isOver ? {} : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
