import {
  Button,
  ButtonGroup,
  Checkbox,
  InlineStack,
  Link,
  Text,
  Toast,
} from "@shopify/polaris";
import { ExportIcon, XIcon, ShareIcon } from "@shopify/polaris-icons";
import { usePolarisStore } from "../store";

import { useState } from "react";
import { encode } from "../utils/encoder";
import { openProject } from "../utils/playground";
import styles from "./Header.module.css";

export function Header() {
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const isBuilderMode = usePolarisStore.use.isBuilderMode();
  const isSuccinctCode = usePolarisStore.use.isSuccinctCode();
  const toggleSuccinctCode = usePolarisStore.use.toggleSuccinctCode();
  const setIsShowCodePanel = usePolarisStore.use.setIsShowCodePanel();
  const setIsBuilderMode = usePolarisStore.use.setIsBuilderMode();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const lastRenderedComponents = usePolarisStore.use.lastRenderedComponents();
  const reset = usePolarisStore.use.reset();
  const [active, setActive] = useState(false);
  const closeToast = () => setActive(false);
  const showToast = () => setActive(true);

  const toggleIsShowCodePanel = () => setIsShowCodePanel(!isShowCodePanel);
  const toggleIsBuilderMode = () => setIsBuilderMode(!isBuilderMode);

  const handleShareClick = () => {
    showToast();
    const code = encode({ renderedComponents, lastRenderedComponents });
    const href = `?code=${code}`;
    window.history.replaceState("", "", href);
    navigator.clipboard.writeText(window.location.origin + href);
  };

  const toastMarkup = active ? (
    <Toast content="Share link copied to clipboard" onDismiss={closeToast} />
  ) : null;

  const openPlayground = () => {
    openProject(renderedComponents);
  };

  return (
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
            onChange={toggleSuccinctCode}
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
  );
}
