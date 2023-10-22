import { BlockStackProps, Link } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { PropItem, TailorList } from "./shared";

type BlockStackAs = NonNullable<BlockStackProps["as"]> | "";
const blockStackAsRecord: Record<NonNullable<BlockStackAs>, 1> = {
  div: 1,
  ul: 1,
  ol: 1,
  fieldset: 1,
  "": 1,
};
const blockStackAsOptions = Object.keys(blockStackAsRecord) as BlockStackAs[];

type BlockStackAlign = NonNullable<BlockStackProps["align"]> | "";
const blockStackAlignRecord: Record<BlockStackAlign, 1> = {
  start: 1,
  center: 1,
  end: 1,
  "space-around": 1,
  "space-between": 1,
  "space-evenly": 1,
  "": 1,
};
const blockStackAlignOptions = Object.keys(
  blockStackAlignRecord,
) as BlockStackAlign[];

type BlockStackInlineAlign = NonNullable<BlockStackProps["inlineAlign"]> | "";
const blockStackInlineAlignRecord: Record<BlockStackInlineAlign, 1> = {
  start: 1,
  center: 1,
  end: 1,
  baseline: 1,
  stretch: 1,
  "": 1,
};
const blockStackInlineAlignOptions = Object.keys(
  blockStackInlineAlignRecord,
) as BlockStackInlineAlign[];

type BlockStackRole = NonNullable<BlockStackProps["role"]> | "";
const blockStackRoleRecord: Record<BlockStackRole, 1> = {
  status: 1,
  presentation: 1,
  menu: 1,
  listbox: 1,
  combobox: 1,
  "": 1,
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
        url="https://polaris.shopify.com/components/layout-and-structure/block-stack"
      >
        Block stack
      </Link>

      <TailorList items={blockStackPropsItems} />
    </>
  );
};
