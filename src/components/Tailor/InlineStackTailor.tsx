import { InlineStackProps, Link } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { PropItem, TailorList } from "./shared";

const inlineStackAlignRecord: Record<
  NonNullable<InlineStackProps["align"] | "">,
  1
> = {
  start: 1,
  center: 1,
  end: 1,
  "space-around": 1,
  "space-between": 1,
  "space-evenly": 1,
  "": 1,
};
const inlineStackAligns = Object.keys(inlineStackAlignRecord) as NonNullable<
  InlineStackProps["align"]
>[];

// 'start' | 'center' | 'end' | 'baseline' | 'stretch'
const inlineStackBlockAlignRecord: Record<
  NonNullable<InlineStackProps["blockAlign"] | "">,
  1
> = {
  start: 1,
  center: 1,
  end: 1,
  baseline: 1,
  stretch: 1,
  "": 1,
};
const inlineStackBlockAligns = Object.keys(
  inlineStackBlockAlignRecord,
) as NonNullable<InlineStackProps["blockAlign"]>[];

const inlineStackPropsItems: PropItem<keyof InlineStackProps>[] = [
  {
    prop: "align",
    type: "Select",
    options: inlineStackAligns,
  },
  {
    prop: "blockAlign",
    type: "Select",
    options: inlineStackBlockAligns,
  },
  {
    prop: "gap",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "wrap",
    type: "Checkbox",
  },
];

export const InlineStackTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/inline-stack"
      >
        Inline stack
      </Link>

      <TailorList items={inlineStackPropsItems} />
    </>
  );
};
