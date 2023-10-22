import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";
import { get as lodashGet } from "lodash-es";

import {
  ComponentName,
  RenderedComponent,
  parentComponentList,
} from "../../types";

import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
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

  const { setNodeRef } = useDroppable({
    id,
  });
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  // @ts-ignore
  const Component = lodashGet(Polaris, component.componentName.split("."));
  const isEmptyChild = !component.children.length;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

  return (
    <DragAndDropItem key={component.id} component={component}>
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
        <DragAndDropItem key={id} component={component}>
          <Component {...finalComponentProps}>
            {children.map((child) => (
              <Preview key={child.id} component={child} />
            ))}
          </Component>
        </DragAndDropItem>
      </div>
    </DragAndDropItem>
  );
}

function DragAndDropItem({
  component,
  children,
}: {
  component: RenderedComponent;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: component.id,
    disabled: checkIfComponentCanBeDragged(component),
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
