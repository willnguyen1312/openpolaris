import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  InlineStack,
  Link,
  Text,
} from "@shopify/polaris";
import { ExportMinor, MobileCancelMajor } from "@shopify/polaris-icons";
import { usePolarisStore } from "../store";

export function Header() {
  const isShowCodePanel = usePolarisStore.use.isShowCodePanel();
  const setIsShowCodePanel = usePolarisStore.use.setIsShowCodePanel();

  const toggleIsShowCodePanel = () => setIsShowCodePanel(!isShowCodePanel);

  return (
    <Box background="bg-surface-brand" padding="400">
      <InlineStack align="space-between">
        <InlineStack gap="400" blockAlign="center">
          <Text as="p" variant="headingLg">
            Open Polaris
          </Text>

          <Checkbox
            onChange={toggleIsShowCodePanel}
            checked={isShowCodePanel}
            label="Code panel"
            value=""
          />

          <ButtonGroup>
            <Button variant="tertiary" icon={MobileCancelMajor}>
              Clear
            </Button>
            <Button variant="tertiary" icon={ExportMinor}>
              Playground
            </Button>
          </ButtonGroup>
        </InlineStack>

        <InlineStack gap="100" blockAlign="center">
          <Text as="p">Made with 💞 by</Text>

          <Link url="https://namnguyen.design/about" target="_blank">
            Nam Nguyen
          </Link>
        </InlineStack>
      </InlineStack>
    </Box>
  );
}
