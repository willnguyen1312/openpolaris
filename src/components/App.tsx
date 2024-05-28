import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
} from "@dnd-kit/core";
import { AppProvider, Frame, Grid, GridCellProps } from "@shopify/polaris";
import { themes } from "@shopify/polaris-tokens";
import enTranslations from "@shopify/polaris/locales/en.json";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMouse } from "react-use";
import { useShortcuts } from "../hooks/useShortcuts";
import { usePolarisStore } from "../store";
import { decode } from "../utils/encoder";
import { TopBar } from "./TopBar";
import { LeftSideBar } from "./LeftSideBar";
import { MainBody } from "./MainBody";
import { Overlay } from "./Overlay";
import { RightSideBar } from "./RightSideBar";

export function App() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(document.body);
  const { docX, docY } = useMouse(ref);
  const setActiveDraggableId = usePolarisStore.use.setActiveDraggableId();
  const activeDraggableId = usePolarisStore.use.activeDraggableId();
  const setRenderedComponents = usePolarisStore.use.setRenderedComponents();
  const setIsHoldShift = usePolarisStore.use.setIsHoldShift();
  const setIsHoldAlt = usePolarisStore.use.setIsHoldAlt();
  const isShowLeftBar = usePolarisStore.use.isShowLeftBar();
  const isShowRightBar = usePolarisStore.use.isShowRightBar();
  const isShowTopBar = usePolarisStore.use.isShowTopBar();
  const handleDragEnd = usePolarisStore.use.handleDragEnd();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDraggableId(event.active.id as string);
  };

  useShortcuts();

  useEffect(() => {
    const currentURL = window.location.href;
    const id = currentURL.split("/").pop();

    async function fetchCode() {
      const data = await fetch(`/shorten/${id}`)
        .then((res) => res.json())
        .catch(() => ({}));
      try {
        if (data.code) {
          const { renderedComponents = [] } = decode(data.code);
          setRenderedComponents(renderedComponents);
        }
      } catch (_) {
      } finally {
        setLoaded(true);
      }
    }

    if (id) {
      fetchCode();
    } else {
      setLoaded(true);
    }
  }, []);

  const {
    leftColumnSpan,
    mainColumnSpan,
    rightColumnSpan,
  }: {
    leftColumnSpan?: GridCellProps["columnSpan"];
    mainColumnSpan?: GridCellProps["columnSpan"];
    rightColumnSpan?: GridCellProps["columnSpan"];
  } = useMemo(() => {
    if (!isShowLeftBar && isShowRightBar) {
      return {
        mainColumnSpan: { md: 5, lg: 10, xl: 10 },
        rightColumnSpan: { md: 1, lg: 2, xl: 2 },
      };
    }

    if (isShowLeftBar && !isShowRightBar) {
      return {
        leftColumnSpan: { md: 1, lg: 2, xl: 2 },
        mainColumnSpan: { md: 5, lg: 10, xl: 10 },
      };
    }

    if (!isShowLeftBar && !isShowRightBar) {
      return {
        mainColumnSpan: { md: 6, lg: 12, xl: 12 },
      };
    }

    return {
      leftColumnSpan: { md: 1, lg: 2, xl: 2 },
      mainColumnSpan: { md: 4, lg: 8, xl: 8 },
      rightColumnSpan: { md: 1, lg: 2, xl: 2 },
    };
  }, [isShowLeftBar, isShowRightBar]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        setIsHoldShift(true);
      }

      if (event.altKey) {
        setIsHoldAlt(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.shiftKey) {
        setIsHoldShift(false);
      }

      if (!event.altKey) {
        setIsHoldAlt(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider i18n={enTranslations}>
      <DndContext
        sensors={[mouseSensor]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Frame>
          {isShowTopBar && <TopBar />}
          <Grid gap={{ md: "0", lg: "0", xl: "0" }}>
            {isShowLeftBar && (
              <Grid.Cell columnSpan={leftColumnSpan}>
                <LeftSideBar />
              </Grid.Cell>
            )}

            <Grid.Cell columnSpan={mainColumnSpan}>
              <MainBody />
            </Grid.Cell>

            {isShowRightBar && (
              <Grid.Cell columnSpan={rightColumnSpan}>
                <RightSideBar />
              </Grid.Cell>
            )}
          </Grid>
        </Frame>

        <DragOverlay
          style={{
            position: "fixed",
            top: docY,
            left: docX,
            transform: `translate(-${themes.light.width["width-300"]}, -${themes.light.width["width-300"]})`,
          }}
          dropAnimation={null}
        >
          {activeDraggableId ? <Overlay /> : null}
        </DragOverlay>
      </DndContext>
    </AppProvider>
  );
}
