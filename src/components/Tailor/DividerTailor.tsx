import { DividerProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

type DividerBorderColors = NonNullable<DividerProps["borderColor"]> | "";

// This is to work around type error when upgrading to new version of polaris
const dividerBorderColorRecord: Record<DividerBorderColors, true> = {
  "border-brand": true,
  "border-caution": true,
  "border-critical-secondary": true,
  "border-critical": true,
  "border-disabled": true,
  "border-emphasis-active": true,
  "border-emphasis-hover": true,
  "border-emphasis": true,
  "border-focus": true,
  "border-hover": true,
  "border-info": true,
  "border-inverse-active": true,
  "border-inverse-hover": true,
  "border-inverse": true,
  "border-magic-secondary": true,
  "border-magic": true,
  "border-secondary": true,
  "border-success": true,
  "border-tertiary": true,
  "border-warning": true,
  border: true,
  transparent: true,
  "input-border": true,
  "input-border-active": true,
  "input-border-hover": true,
  "": true,
};

const dividerBorderColors = Object.keys(
  dividerBorderColorRecord,
) as DividerBorderColors[];

type DividerBorderWidths = NonNullable<DividerProps["borderWidth"]> | "";
const dividerBorderWithRecord: Record<DividerBorderWidths, true> = {
  "0165": true,
  "025": true,
  "050": true,
  "100": true,
  "": true,
};
const dividerBorderWidths = Object.keys(
  dividerBorderWithRecord,
) as DividerBorderWidths[];

const dividerPropsItems: PropItem<keyof DividerProps>[] = [
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
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/divider"
      >
        Divider
      </Link>

      <TailorList items={dividerPropsItems} />
    </>
  );
};
