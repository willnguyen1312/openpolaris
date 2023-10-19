import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";

import { ComponentName, RenderedComponent } from "../../types";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePolarisStore } from "../../store";
import styles from "./Preview.module.css";

const canHaveChildComponents: ComponentName[] = ["ButtonGroup"];

export const Preview = ({ component }: { component: RenderedComponent }) => {
  const { componentName } = component;

  const isParentComponent = canHaveChildComponents.includes(componentName);

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

  return (
    <div
      onPointerDown={(event) => {
        event.stopPropagation();
        setActiveComponentId(component);
      }}
      className={classNames(styles.pointer, {
        [styles.selected]: isSelected && !isDragging,
      })}
    >
      <SortableItem component={component}>
        <Component
          {...component.props}
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

  return (
    <SortableItem key={component.id} component={component}>
      <SortableContext id={id} items={items}>
        <div
          ref={setNodeRef}
          className={classNames(styles.pointer, {
            [styles.emptyChild]: isEmptyChild,
            [styles.selected]: isSelected && !isDragging,
          })}
          onPointerDown={() => {
            setActiveComponentId(component);
          }}
        >
          <SortableItem key={id} component={component}>
            <Component {...component.props}>
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

function SortableItem(props: {
  component: RenderedComponent;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}
