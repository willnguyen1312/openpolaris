import { BleedProps, Link } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { PropItem, TailorList } from "./shared";

const bleedPropsItem: PropItem<keyof BleedProps>[] = [
  {
    prop: "marginInline",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "marginBlock",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "marginBlockStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "marginBlockEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "marginInlineStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "marginInlineEnd",
    type: "Select",
    options: spacingScales,
  },
];

export const BleedTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/bleed"
      >
        Bleed
      </Link>

      <TailorList items={bleedPropsItem} />
    </>
  );
};
