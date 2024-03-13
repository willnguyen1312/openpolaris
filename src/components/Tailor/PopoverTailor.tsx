import { Link, PopoverProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const popoverPreferredPositionRecord: Record<
  NonNullable<PopoverProps["preferredPosition"] | "">,
  1
> = {
  above: 1,
  below: 1,
  mostSpace: 1,
  cover: 1,
  "": 1,
};
const popoverPreferredPositionOptions = Object.keys(
  popoverPreferredPositionRecord,
);

const popoverPreferredAlignmentRecord: Record<
  NonNullable<PopoverProps["preferredAlignment"] | "">,
  1
> = {
  center: 1,
  left: 1,
  right: 1,
  "": 1,
};
const popoverPreferredAlignmentOptions = Object.keys(
  popoverPreferredAlignmentRecord,
);

const popOverAutofocusTargetRecord: Record<
  NonNullable<PopoverProps["autofocusTarget"] | "">,
  1
> = {
  "first-node": 1,
  container: 1,
  none: 1,
  "": 1,
};
const popOverAutofocusTargetOptions = Object.keys(popOverAutofocusTargetRecord);

const popoverPropsItems: PropItem<keyof PopoverProps>[] = [
  {
    prop: "preferredPosition",
    type: "Select",
    options: popoverPreferredPositionOptions,
  },
  {
    prop: "preferredAlignment",
    type: "Select",
    options: popoverPreferredAlignmentOptions,
  },
  {
    prop: "active",
    type: "Checkbox",
  },
  {
    prop: "preferInputActivator",
    type: "Checkbox",
  },
  {
    prop: "activatorWrapper",
    type: "Text",
  },
  {
    prop: "zIndexOverride",
    type: "Number",
  },
  {
    prop: "preventFocusOnClose",
    type: "Checkbox",
  },
  {
    prop: "sectioned",
    type: "Checkbox",
  },
  {
    prop: "fullHeight",
    type: "Checkbox",
  },
  {
    prop: "fullHeight",
    type: "Checkbox",
  },
  {
    prop: "fluidContent",
    type: "Checkbox",
  },
  {
    prop: "fixed",
    type: "Checkbox",
  },
  {
    prop: "hideOnPrint",
    type: "Checkbox",
  },
  {
    prop: "hideOnPrint",
    type: "Checkbox",
  },
  {
    prop: "autofocusTarget",
    type: "Select",
    options: popOverAutofocusTargetOptions,
  },
  {
    prop: "preventCloseOnChildOverlayClick",
    type: "Checkbox",
  },
  {
    prop: "captureOverscroll",
    type: "Checkbox",
  },
];

export const PopoverTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/overlays/popover"
      >
        Popover
      </Link>

      <TailorList items={popoverPropsItems} />
    </>
  );
};
