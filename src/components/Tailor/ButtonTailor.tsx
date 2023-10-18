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

type ButtonTones = NonNullable<ButtonProps["tone"]>;
const buttonTones: ButtonTones[] = ["critical", "success"];

type ButtonVariants = NonNullable<ButtonProps["variant"]>;
const buttonVariants: ButtonVariants[] = [
  "plain",
  "primary",
  "tertiary",
  "monochromePlain",
];

type ButtonDisclosure = NonNullable<ButtonProps["disclosure"]> | "";
const buttonDisclosure: ButtonDisclosure[] = ["down", "up", "select", ""];

const buttonPropItems: PropItem<keyof ButtonProps>[] = [
  { label: "Children", prop: "children", type: "Text" },
  { label: "Size", prop: "size", type: "Select", options: buttonSizes },
  {
    label: "Text align",
    prop: "textAlign",
    type: "Select",
    options: buttonTextAligns,
  },
  { label: "Full width", prop: "fullWidth", type: "Checkbox" },
  {
    label: "Disclosure",
    prop: "disclosure",
    type: "Select",
    options: buttonDisclosure as string[],
  },
  { label: "Data primary link", prop: "dataPrimaryLink", type: "Checkbox" },
  { label: "Tone", prop: "tone", type: "Select", options: buttonTones },
  {
    label: "Variant",
    prop: "variant",
    type: "Select",
    options: buttonVariants,
  },

  // Base Button Props
  { label: "Id", prop: "id", type: "Text" },
  { label: "Url", prop: "url", type: "Text" },
  { label: "External", prop: "external", type: "Checkbox" },
  { label: "Download", prop: "download", type: "Text" },
  { label: "Submit", prop: "submit", type: "Checkbox" },
  { label: "Disabled", prop: "disabled", type: "Checkbox" },
  { label: "Loading", prop: "loading", type: "Checkbox" },
  { label: "Pressed", prop: "pressed", type: "Checkbox" },
  { label: "Accessibility Label", prop: "accessibilityLabel", type: "Text" },
  { label: "Role", prop: "role", type: "Text" },
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
