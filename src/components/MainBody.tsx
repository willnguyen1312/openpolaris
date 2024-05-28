import { useDroppable } from "@dnd-kit/core";
import { ErrorBoundary } from "react-error-boundary";
import SplitPane from "react-split-pane";
import { rootComponentId } from "../types";
import styles from "./MainBody.module.css";

import { ActionList, Banner, Box, EmptyState } from "@shopify/polaris";
import { themes } from "@shopify/polaris-tokens";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { TemplateType, usePolarisStore } from "../store";
import { CodePanel } from "./CodePanel";
import { Preview } from "./Preview";

export function MainBody() {
  const { isOver, setNodeRef } = useDroppable({
    id: rootComponentId,
  });

  const renderedComponents = usePolarisStore.use.renderedComponents();
  const loadFromTemplate = usePolarisStore.use.loadFromTemplate();
  const setActiveComponent = usePolarisStore.use.setActiveComponent();
  const recover = usePolarisStore.use.recover();
  const isHoldShift = usePolarisStore.use.isHoldShift();
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const setHasError = usePolarisStore.use.setHasError();
  const isEmpty = renderedComponents.length === 0;
  const [rect, setRect] = useState<{
    firstPosition: [number, number];
    secondPosition: [number, number];
  }>();

  useEffect(() => {
    const handlePointerUp = () => {
      setRect(undefined);
    };

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const rectDimension = (() => {
    if (!rect) {
      return null;
    }

    const top =
      rect.firstPosition[1] < rect.secondPosition[1]
        ? rect.firstPosition[1]
        : rect.secondPosition[1];
    const left =
      rect.firstPosition[0] < rect.secondPosition[0]
        ? rect.firstPosition[0]
        : rect.secondPosition[0];
    const width = Math.abs(rect.firstPosition[0] - rect.secondPosition[0]);
    const height = Math.abs(rect.firstPosition[1] - rect.secondPosition[1]);

    return {
      top,
      left,
      width,
      height,
    };
  })();

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
        id="main"
        ref={setNodeRef}
        className={classNames(styles.bodyWrapper, {
          [styles.isOver]: isOver,
          [styles.bodyWrapperWithoutCodePanel]: !isShowCodePanel,
        })}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) {
            setActiveComponent(null);
          }

          if (isHoldShift) {
            setRect({
              firstPosition: [event.clientX, event.clientY],
              secondPosition: [event.clientX, event.clientY],
            });
          }
        }}
        onPointerMove={(event) => {
          if (rect) {
            event.preventDefault();
            setRect({
              ...rect,
              secondPosition: [event.clientX, event.clientY],
            });
          }
        }}
        style={{
          userSelect: isHoldShift ? "none" : "auto",
        }}
      >
        {!isEmpty && rectDimension && (
          <div
            style={{
              position: "fixed",
              border: "1px solid red",
              ...rectDimension,
              zIndex: 100,
            }}
          />
        )}

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

        {renderedComponents.map((component) => {
          return <Preview key={component.id} component={component} />;
        })}
      </div>
    </ErrorBoundary>
  );

  return (
    // @ts-ignore
    <SplitPane
      style={{ overflow: "auto", position: "relative" }}
      defaultSize="50%"
      resizerStyle={
        isShowCodePanel
          ? {
              border: `4px solid ${themes.light.color["color-bg-fill-success"]}`,
              zIndex: 20,
              cursor: "row-resize",
            }
          : {}
      }
      split="horizontal"
      className={styles.splitPanel}
    >
      {body}
      <CodePanel />
    </SplitPane>
  );
}
