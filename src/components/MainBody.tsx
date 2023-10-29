import { useDroppable } from "@dnd-kit/core";
import { ErrorBoundary } from "react-error-boundary";
import SplitPane from "react-split-pane";
import { rootComponentId } from "../types";
import styles from "./MainBody.module.css";

import { Banner, Box, EmptyState } from "@shopify/polaris";
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
  const reset = usePolarisStore.use.reset();
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const isEmpty = renderedComponent.length === 0;

  const handleWrapperClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setActiveComponent(null);
    }
  };

  const body = (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary, error }) => {
        const title = `Error: ${error.message}, the app state will be recovered on dismiss`;
        return (
          <Box padding="400">
            <Banner
              title={title}
              tone="critical"
              onDismiss={resetErrorBoundary}
            />
          </Box>
        );
      }}
      onReset={reset}
    >
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
    </ErrorBoundary>
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
