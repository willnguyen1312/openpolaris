import * as Polaris from "@shopify/polaris";
import * as PolarisIcon from "@shopify/polaris-icons";
import classNames from "classnames";

import { usePolarisStore } from "../../store";
import { ComponentName, RenderedComponent } from "../../types";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Preview.module.css";

const inlineBlockComponents: ComponentName[] = ["Button"];
const canHaveChildComponents: ComponentName[] = ["ButtonGroup"];

export const Preview = ({ component }: { component: RenderedComponent }) => {
  const { componentName } = component;
  const setActiveComponentId = usePolarisStore.use.setActiveComponent();
  const activeComponent = usePolarisStore.use.activeComponent();
  const isSelected = activeComponent?.id === component.id;

  const selectComponent = () => {
    setActiveComponentId(component);
  };

  const isParentComponent = canHaveChildComponents.includes(componentName);

  const isEmptyChild =
    canHaveChildComponents.includes(componentName) &&
    !component.children.length;

  return (
    <div
      onClick={selectComponent}
      className={classNames(styles.wrapper, {
        [styles.emptyChild]: isEmptyChild,
        [styles.selected]: isSelected,
        [styles.inlineBlock]: inlineBlockComponents.includes(componentName),
      })}
    >
      {isParentComponent ? (
        <ComponentWithContainer component={component} />
      ) : (
        <SimpleComponent component={component} />
      )}
    </div>
  );
};

function SortableItem(props: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

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

function SimpleComponent({ component }: { component: RenderedComponent }) {
  const { id } = component;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // @ts-ignore
  const Component = Polaris[component.componentName];
  const icon = component.props.icon;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Component
        {...component.props}
        // @ts-ignore
        icon={icon ? PolarisIcon[icon] : undefined}
      />
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

  const items = children.map((child) => child.id);
  // @ts-ignore
  const Component = Polaris[component.componentName];

  return (
    <SortableContext id={id} items={items}>
      <div ref={setNodeRef}>
        {items.map((id) => (
          <SortableItem key={id} id={id}>
            <Component {...component.props}>
              {children.map((child) => (
                <Preview key={child.id} component={child} />
              ))}
            </Component>
          </SortableItem>
        ))}
      </div>
    </SortableContext>
  );
}
