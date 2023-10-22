import { ButtonGroupProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

// This is to work around type error when upgrading to new version of polaris
type ButtonGroupGap = NonNullable<ButtonGroupProps["gap"]> | "";
const buttonGroupGapRecord: Record<ButtonGroupGap, true> = {
  tight: true,
  loose: true,
  extraTight: true,
  "": true,
};
const buttonGroupGaps = Object.keys(buttonGroupGapRecord) as ButtonGroupGap[];

type ButtonGroupVariant = NonNullable<ButtonGroupProps["variant"]> | "";
const buttonGroupVariantRecord: Record<ButtonGroupVariant, true> = {
  segmented: true,
  "": true,
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
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/actions/button-group"
      >
        Button Group
      </Link>

      <TailorList items={buttonGroupPropsItems} />
    </>
  );
};
