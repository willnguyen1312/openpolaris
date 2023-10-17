import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { AppProvider, Grid } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import { Header } from "./components/Header";
import { LeftSideBar } from "./components/LeftSideBar";
import { MainBody } from "./components/MainBody";
import { RightSideBar } from "./components/RightSideBar";
import { usePolarisStore } from "./store";

export default function AppSettingsLayoutExample() {
  const setActiveDraggableId = usePolarisStore.use.setActiveDraggableId();
  const activeDraggableId = usePolarisStore.use.activeDraggableId();

  function handleDragStart(event: DragStartEvent) {
    setActiveDraggableId(event.active.id);
  }

  function handleDragEnd() {
    setActiveDraggableId(null);
  }

  return (
    <AppProvider i18n={enTranslations}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Header />
        <Grid gap={{ lg: "0", xl: "0" }}>
          <Grid.Cell columnSpan={{ lg: 2, xl: 2 }}>
            <LeftSideBar />
          </Grid.Cell>

          <Grid.Cell columnSpan={{ lg: 8, xl: 8 }}>
            <MainBody />
          </Grid.Cell>

          <Grid.Cell columnSpan={{ lg: 2, xl: 2 }}>
            <RightSideBar />
          </Grid.Cell>
        </Grid>

        <DragOverlay dropAnimation={null}>
          {activeDraggableId ? (
            <div
              style={{
                cursor: "pointer",
              }}
            >
              {activeDraggableId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </AppProvider>
  );
}
