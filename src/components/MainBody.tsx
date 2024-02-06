import { useDroppable } from "@dnd-kit/core";
import { ErrorBoundary } from "react-error-boundary";
import SplitPane from "react-split-pane";
import { rootComponentId } from "../types";
import styles from "./MainBody.module.css";

import { ActionList, Banner, Box, EmptyState } from "@shopify/polaris";
import { themes } from "@shopify/polaris-tokens";
import classNames from "classnames";
import { MouseEvent } from "react";
import { TemplateType, usePolarisStore } from "../store";
import { CodePanel } from "./CodePanel";
import { Preview } from "./Preview";

export function MainBody() {
  const { isOver, setNodeRef } = useDroppable({
    id: rootComponentId,
  });

  const renderedComponent = usePolarisStore.use.renderedComponents();
  const loadFromTemplate = usePolarisStore.use.loadFromTemplate();
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const recover = usePolarisStore.use.recover();
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const setHasError = usePolarisStore.use.setHasError();
  const isEmpty = renderedComponent.length === 0;

  const handleWrapperClick = (event: MouseEvent) => {
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
      onReset={recover}
      onError={() => {
        setHasError(true);
      }}
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
          <>
            <EmptyState
              heading="Drag some component or choose from pre-built templates below to start building your merchant app"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            />

            <ActionList
              items={[
                {
                  content: "Add product form",
                  helpText: "A form to add product to your store",
                  onAction: () => {
                    loadFromTemplate(TemplateType.addProductForm);
                  },
                },
                {
                  content: "Setting page",
                  helpText: "A page to manage your app settings",
                  onAction: () => {
                    loadFromTemplate(TemplateType.settingsPage);
                  },
                },
              ]}
            />
          </>
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
      className={styles.splitPanel}
    >
      {body}
      <CodePanel />
    </SplitPane>
  );
}
