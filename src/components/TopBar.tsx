import {
  Button,
  ButtonGroup,
  Checkbox,
  InlineStack,
  Link,
  Modal,
  Text,
  Toast,
  KeyboardKey,
  BlockStack,
} from "@shopify/polaris";
import {
  ExportIcon,
  XIcon,
  ShareIcon,
  KeyboardIcon,
} from "@shopify/polaris-icons";
import { usePolarisStore } from "../store";

import { useEffect, useState } from "react";
import { encode } from "../utils/encoder";
import { openProject } from "../utils/playground";
import styles from "./Topbar.module.css";

type ShortCutItem = {
  key: string;
  description: string;
};

const shortcuts: ShortCutItem[] = [
  {
    key: "Esc",
    description: "Escape active component",
  },
  {
    key: "Delete",
    description: "Delete active component",
  },
  {
    key: "ctrl / cmd + d",
    description: "Duplicate active component",
  },
  {
    key: "ctrl / cmd + b",
    description: "Toggle builder mode",
  },
  {
    key: "ctrl / cmd + z",
    description: "Undo",
  },
  {
    key: "ctrl / cmd + Shift + z",
    description: "Redo",
  },
  {
    key: "ctrl / cmd + Shift + ←",
    description: "Move active component to left",
  },
  {
    key: "ctrl / cmd + Shift + →",
    description: "Move active component to right",
  },
  {
    key: "ctrl / cmd + 1",
    description: "Toggle code panel",
  },
  {
    key: "ctrl / cmd + 2",
    description: "Toggle left bar",
  },
  {
    key: "ctrl / cmd + 3",
    description: "Toggle right bar",
  },
  {
    key: "ctrl / cmd + 4",
    description: "Toggle top bar",
  },
  {
    key: "ctrl / cmd + k",
    description: "Toggle this menu",
  },
  {
    key: "↑",
    description: "Move to previous component",
  },
  {
    key: "↓",
    description: "Move to next component",
  },
];

export function TopBar() {
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const isBuilderMode = usePolarisStore.use.isBuilderMode();
  const isSuccinctCode = usePolarisStore.use.isSuccinctCode();
  const isKeyboardShortcutsModalOpen =
    usePolarisStore.use.isKeyboardShortcutsModalOpen();
  const setIsSuccinctCode = usePolarisStore.use.setIsSuccinctCode();
  const setIsShowCodePanel = usePolarisStore.use.setIsShowCodePanel();
  const setIsBuilderMode = usePolarisStore.use.setIsBuilderMode();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const setIsKeyboardShortcutsModalOpen =
    usePolarisStore.use.setIsKeyboardShortcutsModalOpen();
  const reset = usePolarisStore.use.reset();
  const [active, setActive] = useState(false);
  const closeToast = () => setActive(false);
  const showToast = () => setActive(true);

  const toggleIsShowCodePanel = () => setIsShowCodePanel(!isShowCodePanel);
  const toggleIsBuilderMode = () => setIsBuilderMode(!isBuilderMode);
  const toggleIsSuccinctCode = () => setIsSuccinctCode(!isSuccinctCode);

  const handleShareClick = async () => {
    showToast();
    const code = encode({ renderedComponents });
    const data = await fetch("/shorten", {
      method: "POST",
      body: JSON.stringify({ code }),
    }).then((res) => res.json());

    if (data.id) {
      const newURL = window.location.origin + "/" + data.id;
      window.history.replaceState("", "", newURL);
      navigator.clipboard.writeText(newURL);
    }
  };

  const toastMarkup = active ? (
    <Toast content="Share link copied to clipboard" onDismiss={closeToast} />
  ) : null;

  const openPlayground = () => {
    openProject(renderedComponents);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1132) {
        document.documentElement.style.setProperty("--topbar-height", "60px");
      } else {
        document.documentElement.style.setProperty("--topbar-height", "80px");
      }
    });
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <InlineStack align="space-between">
          <InlineStack gap="400" blockAlign="center">
            <Text as="h1" variant="headingLg">
              Open Polaris
            </Text>

            <Checkbox
              onChange={toggleIsShowCodePanel}
              checked={isShowCodePanel}
              label="Code panel"
            />

            <Checkbox
              onChange={toggleIsSuccinctCode}
              checked={isSuccinctCode}
              label="Succinct code"
            />

            <Checkbox
              onChange={toggleIsBuilderMode}
              checked={isBuilderMode}
              label="Builder mode"
            />

            <ButtonGroup>
              <Button onClick={reset} icon={XIcon}>
                Clear
              </Button>
              <Button icon={ExportIcon} onClick={openPlayground}>
                Playground
              </Button>
              XIcon
              <Button onClick={handleShareClick} icon={ShareIcon}>
                Share
              </Button>
              <Button
                onClick={() => setIsKeyboardShortcutsModalOpen(true)}
                icon={KeyboardIcon}
              >
                Shortcuts
              </Button>
            </ButtonGroup>
          </InlineStack>

          <InlineStack gap="100" blockAlign="center">
            <iframe
              frameBorder="0"
              src="https://ghbtns.com/github-btn.html?user=willnguyen1312&repo=openpolaris&type=star&size=large&text=false"
              scrolling="0"
              width="40"
              height="30"
              title="GitHub"
            ></iframe>

            <Text as="p">Made with 💞 by</Text>

            <Link url="https://namnguyen.design/about" target="_blank">
              Nam Nguyen
            </Link>
          </InlineStack>

          {toastMarkup}
        </InlineStack>
      </div>

      <Modal
        open={isKeyboardShortcutsModalOpen}
        onClose={() => setIsKeyboardShortcutsModalOpen(false)}
        title="Keyboard shortcuts"
      >
        <Modal.Section>
          <BlockStack gap="200">
            {shortcuts.map((item) => (
              <Text as="p" key={item.key}>
                <KeyboardKey>{item.key}</KeyboardKey> {item.description}
              </Text>
            ))}
          </BlockStack>
        </Modal.Section>
      </Modal>
    </>
  );
}
