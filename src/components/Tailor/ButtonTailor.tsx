import { BlockStack, ButtonProps, Text } from "@shopify/polaris";

import type { PropItem } from "./shared";
import * as Shared from "./shared";

type ButtonSizes = NonNullable<ButtonProps["size"]>;
const buttonSizes: ButtonSizes[] = ["micro", "slim", "medium", "large"];

type ButtonTextAligns = NonNullable<ButtonProps["textAlign"]>;
const buttonTextAligns: ButtonTextAligns[] = [
  "left",
  "right",
  "center",
  "start",
  "end",
];

const buttonPropItems: PropItem[] = [
  { label: "Children", prop: "children", type: "Text" },
  { label: "Size", prop: "size", type: "Select", options: buttonSizes },
  {
    label: "Text align",
    prop: "textAlign",
    type: "Select",
    options: buttonTextAligns,
  },
  { label: "Full width", prop: "fullWidth", type: "Checkbox" },
  { label: "Data primary link", prop: "dataPrimaryLink", type: "Checkbox" },
  { label: "Disabled", prop: "disabled", type: "Checkbox" },
];

export const ButtonTailor = () => {
  return (
    <BlockStack>
      <Text as="p" variant="headingMd">
        Button
      </Text>

      {buttonPropItems.map((item) => {
        const Component = Shared[item.type];

        return (
          <Component
            key={item.prop}
            label={item.label}
            prop={item.prop}
            options={item.options as any}
          />
        );
      })}
    </BlockStack>
  );
};
