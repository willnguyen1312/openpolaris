import { BleedProps } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { DocLink, PropItem, TailorList } from "./shared";

const bleedPropsItems: PropItem<keyof BleedProps>[] = [
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
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/bleed"
      >
        Bleed
      </DocLink>

      <TailorList items={bleedPropsItems} />
    </>
  );
};
