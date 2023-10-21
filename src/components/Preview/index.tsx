import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";

import {
  ComponentName,
  RenderedComponent,
  parentComponentList,
} from "../../types";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
      <SortableItem component={component}>
        <Component
          {...finalComponentProps}
          // @ts-ignore
          icon={icon ? PolarisIcon[icon] : undefined}
        />
      </SortableItem>
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
  const items = children.map((child) => child.id);
  // @ts-ignore
  const Component = Polaris[component.componentName];
  const isEmptyChild = !component.children.length;
  const isSelected = activeComponent?.id === component.id;
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const isDragging = activeDraggableId === component.id;
  const finalComponentProps = finalizeComponentProps(component);

  return (
    <SortableItem key={component.id} component={component}>
      <SortableContext id={id} items={items}>
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
          <SortableItem key={id} component={component}>
            <Component {...finalComponentProps}>
              {children.map((child) => (
                <Preview key={child.id} component={child} />
              ))}
            </Component>
          </SortableItem>
        </div>
      </SortableContext>
    </SortableItem>
  );
}

function SortableItem({
  component,
  children,
}: {
  component: RenderedComponent;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: component.id,
      disabled: checkIfComponentCanBeDragged(component),
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
