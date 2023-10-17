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

export function Header() {
  return (
    <Box background="bg-surface-brand" padding="400">
      <InlineStack align="space-between">
        <InlineStack gap="400" blockAlign="center">
          <Text as="p" variant="headingLg">
            Open Polaris
          </Text>

          <Checkbox label="Code panel" value="" />

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

          <Link url="https://help.shopify.com/manual" target="_blank">
            Nam Nguyen
          </Link>
        </InlineStack>
      </InlineStack>
    </Box>
  );
}
