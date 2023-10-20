import { useDroppable } from "@dnd-kit/core";
import SplitPane from "react-split-pane";
import { rootComponentId } from "../types";
import styles from "./MainBody.module.css";

import { SortableContext } from "@dnd-kit/sortable";
import { EmptyState } from "@shopify/polaris";
import { themes } from "@shopify/polaris-tokens";
import classNames from "classnames";
import { usePolarisStore } from "../store";
import { CodePanel } from "./CodePanel";
import { Preview } from "./Preview";

export function MainBody() {
  const { isOver, setNodeRef } = useDroppable({
    id: rootComponentId,
  });

  const renderedComponent = usePolarisStore.use.renderedComponents();
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const isEmpty = renderedComponent.length === 0;
  const items = renderedComponent.map((component) => component.id);

  const handleWrapperClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setActiveComponent(null);
    }
  };

  const body = (
    <SortableContext id={rootComponentId} items={items}>
      <div
        ref={setNodeRef}
        className={classNames(styles.bodyWrapper, {
          [styles.isOver]: isOver,
          [styles.bodyWrapperWithoutCodePanel]: !isShowCodePanel,
        })}
        onClick={handleWrapperClick}
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
    </SortableContext>
  );

  if (!isShowCodePanel) {
    return body;
  }

  return (
    // @ts-ignore
    <SplitPane
      style={{ overflow: "auto", position: "relative" }}
      defaultSize="50%"
      resizerStyle={{
        border: `4px solid ${themes.light.color["color-bg-fill-success"]}`,
        zIndex: 20,
        cursor: "row-resize",
      }}
      split="horizontal"
    >
      {body}
      <CodePanel />
    </SplitPane>
  );
}
