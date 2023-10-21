import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";

import {
  ComponentName,
  RenderedComponent,
  parentComponentList,
} from "../../types";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { omitBy } from "lodash-es";
import { usePolarisStore } from "../../store";
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
  return omitBy(component.props, (value) => {
    if (typeof value === "string" && value === "") {
      return true;
    }

    return false;
  });
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
      <DraggableItem component={component}>
        <Component
          {...finalComponentProps}
          // @ts-ignore
          icon={icon ? PolarisIcon[icon] : undefined}
        />
      </DraggableItem>
    </div>
  );
}

function ComponentWithContainer({
  component,
}: {
  component: RenderedComponent;
}) {
  const { id, children } = component;

  const { setNodeRef } = useDroppable({
    id,
  });
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  // @ts-ignore
  const Component = Polaris[component.componentName];
  const isEmptyChild = !component.children.length;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

  return (
    <DraggableItem key={component.id} component={component}>
      <div
        ref={setNodeRef}
        className={classNames(styles.containerWrapper, {
          [styles.emptyChild]: isEmptyChild,
          [styles.selected]: isSelected && !isDragging,
        })}
        onPointerDown={(event) => {
          event.stopPropagation();
          setActiveComponentId(component);
        }}
      >
        <DraggableItem key={id} component={component}>
          <Component {...finalComponentProps}>
            {children.map((child) => (
              <Preview key={child.id} component={child} />
            ))}
          </Component>
        </DraggableItem>
      </div>
    </DraggableItem>
  );
}

function DraggableItem({
  component,
  children,
}: {
  component: RenderedComponent;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.id,
    disabled: checkIfComponentCanBeDragged(component),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.wrapper}
    >
      {children}
    </div>
  );
}
