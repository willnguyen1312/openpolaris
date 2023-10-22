import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
} from "@dnd-kit/core";
import { AppProvider, Frame, Grid } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import { useEffect, useRef } from "react";
import { useMouse } from "react-use";
import { useShortcuts } from "../hooks/useShortcuts";
import { usePolarisStore } from "../store";
import { decode } from "../utils/encoder";
import { Header } from "./Header";
import { LeftSideBar } from "./LeftSideBar";
import { MainBody } from "./MainBody";
import { Overlay } from "./Overlay";
import { RightSideBar } from "./RightSideBar";

export function App() {
  const ref = useRef(document.body);
  const { docX, docY } = useMouse(ref);
  const setActiveDraggableId = usePolarisStore.use.setActiveDraggableId();
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const setTree = usePolarisStore.use.setTree();
  const handleDragEnd = usePolarisStore.use.handleDragEnd();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDraggableId(event.active.id as string);
  };

  useShortcuts();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      try {
        const decodedCode = decode(code);
        setTree(decodedCode);
      } catch (_) {}
    }
  }, []);

  return (
    <AppProvider i18n={enTranslations}>
      <DndContext
        sensors={[mouseSensor]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Frame>
          <Header />
          <Grid gap={{ md: "0", lg: "0", xl: "0" }}>
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
        </Frame>

        <DragOverlay
          style={{
            position: "fixed",
            top: docY,
            left: docX,
            transform: "translate(-10px, -10px)",
          }}
          dropAnimation={null}
        >
          {activeDraggableId ? <Overlay id={activeDraggableId} /> : null}
        </DragOverlay>
      </DndContext>
    </AppProvider>
  );
}
