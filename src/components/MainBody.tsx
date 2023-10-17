import { useDroppable } from "@dnd-kit/core";
import { rootComponentId } from "../types";
import styles from "./MainBody.module.css";

import { EmptyState } from "@shopify/polaris";
import classNames from "classnames";
import { usePolarisStore } from "../store";
import { Preview } from "./Preview";

export function MainBody() {
  const { isOver, setNodeRef } = useDroppable({
    id: rootComponentId,
  });

  const renderedComponent = usePolarisStore.use.renderedComponents();
  const isEmpty = renderedComponent.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={classNames(styles.wrapper, {
        [styles.isOver]: isOver,
      })}
    >
      {isEmpty ? (
        <EmptyState
          heading="Drag some component to start building your merchant app"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        />
      ) : null}

      {renderedComponent.map((component) => {
        return <Preview key={component.id} component={component} />;
      })}
    </div>
  );
}
