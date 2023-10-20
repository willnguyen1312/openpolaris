import {
  Button,
  ButtonGroup,
  Checkbox,
  InlineStack,
  Link,
  Text,
  Toast,
} from "@shopify/polaris";
import {
  ExportMinor,
  MobileCancelMajor,
  ShareMinor,
} from "@shopify/polaris-icons";
import { usePolarisStore } from "../store";

import { useState } from "react";
import { encode } from "../utils/encoder";
import styles from "./Header.module.css";

export function Header() {
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const setIsShowCodePanel = usePolarisStore.use.setIsShowCodePanel();
  const renderedComponents = usePolarisStore.use.renderedComponents();
  const reset = usePolarisStore.use.reset();
  const toggleIsShowCodePanel = () => setIsShowCodePanel(!isShowCodePanel);
  const [active, setActive] = useState(false);
  const closeToast = () => setActive(false);
  const showToast = () => setActive(true);

  const handleShareClick = () => {
    showToast();
    const code = encode(JSON.stringify(renderedComponents));
    const href = `?code=${code}`;
    window.history.replaceState("", "", href);
    navigator.clipboard.writeText(window.location.origin + href);
  };

  const toastMarkup = active ? (
    <Toast content="Share link copied to clipboard" onDismiss={closeToast} />
  ) : null;

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
            value=""
          />

          <ButtonGroup>
            <Button
              onClick={reset}
              tone="success"
              variant="tertiary"
              icon={MobileCancelMajor}
            >
              Clear
            </Button>

            <Button tone="success" variant="tertiary" icon={ExportMinor}>
              Playground
            </Button>

            <Button
              onClick={handleShareClick}
              tone="success"
              variant="tertiary"
              icon={ShareMinor}
            >
              Share
            </Button>
          </ButtonGroup>
        </InlineStack>

        <InlineStack gap="100" blockAlign="center">
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
