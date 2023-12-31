import { InlineGridProps } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { DocLink, PropItem, TailorList } from "./shared";

const gridAlignItemRecord: Record<
  NonNullable<InlineGridProps["alignItems"] | "">,
  1
> = {
  start: 1,
  center: 1,
  end: 1,
  "": 1,
};
const gridAlignItems = Object.keys(gridAlignItemRecord) as NonNullable<
  InlineGridProps["alignItems"]
>[];

const inlineGridPropsItems: PropItem<keyof InlineGridProps>[] = [
  {
    prop: "columns",
    type: "Number",
  },
  {
    prop: "gap",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "alignItems",
    type: "Select",
    options: gridAlignItems,
  },
];

export const InlineGridTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/inline-grid"
      >
        Inline grid
      </DocLink>

      <TailorList items={inlineGridPropsItems} />
    </>
  );
};
