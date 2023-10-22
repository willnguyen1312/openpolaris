import { BlockStackProps, Link } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { PropItem, TailorList } from "./shared";

type BlockStackAs = NonNullable<BlockStackProps["as"]> | "";
const blockStackAsRecord: Record<NonNullable<BlockStackAs>, true> = {
  div: true,
  ul: true,
  ol: true,
  fieldset: true,
  "": true,
};
const blockStackAsOptions = Object.keys(blockStackAsRecord) as BlockStackAs[];

type BlockStackAlign = NonNullable<BlockStackProps["align"]> | "";
const blockStackAlignRecord: Record<BlockStackAlign, true> = {
  start: true,
  center: true,
  end: true,
  "space-around": true,
  "space-between": true,
  "space-evenly": true,
  "": true,
};
const blockStackAlignOptions = Object.keys(
  blockStackAlignRecord,
) as BlockStackAlign[];

type BlockStackInlineAlign = NonNullable<BlockStackProps["inlineAlign"]> | "";
const blockStackInlineAlignRecord: Record<BlockStackInlineAlign, true> = {
  start: true,
  center: true,
  end: true,
  baseline: true,
  stretch: true,
  "": true,
};
const blockStackInlineAlignOptions = Object.keys(
  blockStackInlineAlignRecord,
) as BlockStackInlineAlign[];

type BlockStackRole = NonNullable<BlockStackProps["role"]> | "";
const blockStackRoleRecord: Record<BlockStackRole, true> = {
  status: true,
  presentation: true,
  menu: true,
  listbox: true,
  combobox: true,
  "": true,
};
const blockStackRoleOptions = Object.keys(
  blockStackRoleRecord,
) as BlockStackRole[];

const blockStackPropsItems: PropItem<keyof BlockStackProps>[] = [
  {
    prop: "as",
    type: "Select",
    options: blockStackAsOptions,
  },
  {
    prop: "align",
    type: "Select",
    options: blockStackAlignOptions,
  },
  {
    prop: "inlineAlign",
    type: "Select",
    options: blockStackInlineAlignOptions,
  },
  {
    prop: "gap",
    type: "Select",
    options: spacingScales,
  },
  { prop: "id", type: "Text" },
  {
    prop: "reverseOrder",
    type: "Checkbox",
  },
  {
    prop: "role",
    type: "Select",
    options: blockStackRoleOptions,
  },
];

export const BlockStackTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/divider"
      >
        Divider
      </Link>

      <TailorList items={blockStackPropsItems} />
    </>
  );
};
