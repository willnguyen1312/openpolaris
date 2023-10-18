import { BlockStack, ButtonProps, Link } from "@shopify/polaris";

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
  { prop: "children", type: "Text" },
  { prop: "size", type: "Select", options: buttonSizes },
  {
    prop: "textAlign",
    type: "Select",
    options: buttonTextAligns,
  },
  { prop: "fullWidth", type: "Checkbox" },
  {
    prop: "disclosure",
    type: "Select",
    options: buttonDisclosure as string[],
  },
  { prop: "dataPrimaryLink", type: "Checkbox" },
  { prop: "tone", type: "Select", options: buttonTones },
  {
    prop: "variant",
    type: "Select",
    options: buttonVariants,
  },

  // Base Button Props
  { prop: "id", type: "Text" },
  { prop: "url", type: "Text" },
  { prop: "external", type: "Checkbox" },
  { prop: "download", type: "Text" },
  { prop: "submit", type: "Checkbox" },
  { prop: "disabled", type: "Checkbox" },
  { prop: "loading", type: "Checkbox" },
  { prop: "pressed", type: "Checkbox" },
  { prop: "accessibilityLabel", type: "Text" },
  { prop: "role", type: "Text" },
];

export const ButtonTailor = () => {
  return (
    <BlockStack>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/actions/button"
      >
        Button
      </Link>

      {buttonPropItems.map((item) => {
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
