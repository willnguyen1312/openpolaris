import { ButtonGroupProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

// This is to work around type error when upgrading to new version of polaris
type ButtonGroupGap = NonNullable<ButtonGroupProps["gap"]> | "";
const buttonGroupGapRecord: Record<ButtonGroupGap, 1> = {
  tight: 1,
  loose: 1,
  extraTight: 1,
  "": 1,
};
const buttonGroupGaps = Object.keys(buttonGroupGapRecord) as ButtonGroupGap[];

type ButtonGroupVariant = NonNullable<ButtonGroupProps["variant"]> | "";
const buttonGroupVariantRecord: Record<ButtonGroupVariant, 1> = {
  segmented: 1,
  "": 1,
};
const buttonGroupVariants = Object.keys(
  buttonGroupVariantRecord,
) as ButtonGroupVariant[];

const buttonGroupPropsItems: PropItem<keyof ButtonGroupProps>[] = [
  {
    prop: "gap",
    type: "Select",
    options: buttonGroupGaps,
  },
  {
    prop: "variant",
    type: "Select",
    options: buttonGroupVariants,
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
  {
    prop: "connectedTop",
    type: "Checkbox",
  },
  {
    prop: "noWrap",
    type: "Checkbox",
  },
];

export const ButtonGroupTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/actions/button-group"
      >
        Button Group
      </DocLink>

      <TailorList items={buttonGroupPropsItems} />
    </>
  );
};
