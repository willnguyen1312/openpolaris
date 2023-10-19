import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
} from "@dnd-kit/core";
import { AppProvider, Grid } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import styles from "./App.module.css";

import { Header } from "./components/Header";
import { LeftSideBar } from "./components/LeftSideBar";
import { MainBody } from "./components/MainBody";
import { Preview } from "./components/Preview";
import { RightSideBar } from "./components/RightSideBar";
import { useShortcuts } from "./hooks/useShortcuts";
import { findComponentBy, usePolarisStore } from "./store";
import { listOfComponent } from "./types";

export default function AppSettingsLayoutExample() {
  const setActiveDraggableId = usePolarisStore.use.setActiveDraggableId();
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const handleDragOver = usePolarisStore.use.handleDragOver();
  const handleDragEnd = usePolarisStore.use.handleDragEnd();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  useShortcuts();

  function handleDragStart(event: DragStartEvent) {
    setActiveDraggableId(event.active.id as string);
  }

  return (
    <AppProvider i18n={enTranslations}>
      <DndContext
        sensors={[mouseSensor]}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Header />
        <Grid gap={{ lg: "0", xl: "0" }}>
          <Grid.Cell columnSpan={{ md: 1, lg: 2, xl: 2 }}>
            <LeftSideBar />
          </Grid.Cell>

          <Grid.Cell columnSpan={{ md: 4, lg: 8, xl: 8 }}>
            <MainBody />
          </Grid.Cell>

          <Grid.Cell columnSpan={{ md: 1, lg: 2, xl: 2 }}>
            <RightSideBar />
          </Grid.Cell>
        </Grid>

        <DragOverlay dropAnimation={null}>
          {activeDraggableId ? (
            <OverlayComponent id={activeDraggableId} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </AppProvider>
  );
}

function OverlayComponent({ id }: { id: string }) {
  const renderedComponent = usePolarisStore.use.renderedComponents();

  if (listOfComponent.find((component) => component.componentName === id)) {
    return <div className={styles.overlayWrapper}>{id}</div>;
  }

  const component = findComponentBy(
    renderedComponent,
    (component) => component.id === id,
  );

  if (!component) {
    return null;
  }

  return (
    <div className={styles.overlayWrapper}>
      <Preview component={component} />
    </div>
  );
}
