import { ButtonProps, Link } from "@shopify/polaris";

import { PropItem, TailorList } from "./shared";

// This is to work around type error when upgrading to new version of polaris
type ButtonSizes = NonNullable<ButtonProps["size"]> | "";
const buttonSizeRecord: Record<ButtonSizes, true> = {
  micro: true,
  slim: true,
  medium: true,
  large: true,
  "": true,
};
const buttonSizes = Object.keys(buttonSizeRecord) as ButtonSizes[];

type ButtonTextAligns = NonNullable<ButtonProps["textAlign"]> | "";
const buttonTextAlignRecord: Record<ButtonTextAligns, true> = {
  left: true,
  right: true,
  center: true,
  start: true,
  end: true,
  "": true,
};

const buttonTextAligns = Object.keys(
  buttonTextAlignRecord,
) as ButtonTextAligns[];

type ButtonTones = NonNullable<ButtonProps["tone"]> | "";
const buttonToneRecord: Record<ButtonTones, true> = {
  critical: true,
  success: true,
  "": true,
};
const buttonTones = Object.keys(buttonToneRecord) as ButtonTones[];

type ButtonVariants = NonNullable<ButtonProps["variant"]> | "";
const buttonVariantRecord: Record<ButtonVariants, true> = {
  plain: true,
  primary: true,
  tertiary: true,
  monochromePlain: true,
  "": true,
};
const buttonVariants = Object.keys(buttonVariantRecord) as ButtonVariants[];

type ButtonDisclosure =
  | NonNullable<Exclude<ButtonProps["disclosure"], boolean>>
  | "";
const buttonDisclosureRecord: Record<ButtonDisclosure, true> = {
  down: true,
  up: true,
  select: true,
  "": true,
};
const buttonDisclosure = Object.keys(
  buttonDisclosureRecord,
) as ButtonDisclosure[];

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
  { prop: "icon", type: "Icon" },
];

export const ButtonTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/actions/button"
      >
        Button
      </Link>

      <TailorList items={buttonPropItems} />
    </>
  );
};
