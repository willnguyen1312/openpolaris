import { BlockStack, DividerProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

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
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/divider"
      >
        Divider
      </Link>

      <TailorList items={dividerPropsItem} />
    </BlockStack>
  );
};
