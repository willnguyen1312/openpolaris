import { BlockStack, DividerProps, Text } from "@shopify/polaris";
import type { PropItem } from "./shared";
import * as Shared from "./shared";

type DividerBorderColors = NonNullable<DividerProps["borderColor"]>;
const dividerBorderColors: DividerBorderColors[] = [
  "border-brand",
  "border-caution",
  "border-critical-secondary",
  "border-critical",
  "border-disabled",
  "border-emphasis-active",
  "border-emphasis-hover",
  "border-emphasis",
  "border-focus",
  "border-hover",
  "border-info",
  "border-inverse-active",
  "border-inverse-hover",
  "border-inverse",
  "border-magic-secondary",
  "border-magic",
  "border-secondary",
  "border-success",
  "border-tertiary",
  "border-warning",
  "border",
  "transparent",
];

type DividerBorderWidths = NonNullable<DividerProps["borderWidth"]>;
const dividerBorderWidths: DividerBorderWidths[] = [
  "0165",
  "025",
  "050",
  "100",
];

const dividerPropsItem: PropItem[] = [
  {
    prop: "borderColor",
    type: "Select",
    options: dividerBorderColors,
  },
  {
    prop: "borderWidth",
    type: "Select",
    options: dividerBorderWidths,
  },
];

export const DividerTailor = () => {
  return (
    <BlockStack>
      <Text as="p" variant="headingMd">
        Divider
      </Text>

      {dividerPropsItem.map((item) => {
        const Component = Shared[item.type];

        return (
          <Component
            key={item.prop}
            prop={item.prop}
            options={item.options as any}
          />
        );
      })}
    </BlockStack>
  );
};
