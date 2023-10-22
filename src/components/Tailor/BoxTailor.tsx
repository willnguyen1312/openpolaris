import { BoxProps, Link } from "@shopify/polaris";
import {
  borderRadiusAliasOrScales,
  borderWidthScales,
  colorBackgroundAliases,
  colorBorderAliases,
  colorBorderAliasesWithTransparent,
  colorTextAliases,
  shadowScales,
  spacingScales,
} from "../../types";
import { PropItem, TailorList } from "./shared";

// type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';
const boxAsRecord: Record<NonNullable<BoxProps["as"]> | "", 1> = {
  div: 1,
  span: 1,
  section: 1,
  legend: 1,
  ul: 1,
  li: 1,
  "": 1,
};

const boxAsOptions = Object.keys(boxAsRecord) as NonNullable<BoxProps["as"]>[];

const boxLineStyleRecord: Record<NonNullable<BoxProps["borderStyle"]> | "", 1> =
  {
    dashed: 1,
    solid: 1,
    "": 1,
  };
const boxLineStyleOptions = Object.keys(boxLineStyleRecord) as NonNullable<
  BoxProps["borderStyle"]
>[];

const overFlowRecord: Record<NonNullable<BoxProps["overflowX"]> | "", 1> = {
  hidden: 1,
  scroll: 1,
  "": 1,
};
const overFlowOptions = Object.keys(overFlowRecord) as NonNullable<
  BoxProps["overflowX"]
>[];

const boxRoleRecord: Record<NonNullable<BoxProps["role"]> | "", 1> = {
  status: 1,
  presentation: 1,
  menu: 1,
  listbox: 1,
  combobox: 1,
  "": 1,
};
const boxRoleOptions = Object.keys(boxRoleRecord) as NonNullable<
  BoxProps["role"]
>[];

const boxPositionRecord: Record<NonNullable<BoxProps["position"]> | "", 1> = {
  absolute: 1,
  relative: 1,
  fixed: 1,
  sticky: 1,
  "": 1,
};
const boxPositionOptions = Object.keys(boxPositionRecord) as NonNullable<
  BoxProps["position"]
>[];

const boxPropsItems: PropItem<keyof BoxProps>[] = [
  { prop: "as", type: "Select", options: boxAsOptions },
  { prop: "background", type: "Select", options: colorBackgroundAliases },
  {
    prop: "borderColor",
    type: "Select",
    options: colorBorderAliasesWithTransparent,
  },
  { prop: "borderStyle", type: "Select", options: boxLineStyleOptions },
  { prop: "borderRadius", type: "Select", options: borderRadiusAliasOrScales },
  {
    prop: "borderEndStartRadius",
    type: "Select",
    options: borderRadiusAliasOrScales,
  },
  {
    prop: "borderEndEndRadius",
    type: "Select",
    options: borderRadiusAliasOrScales,
  },
  {
    prop: "borderStartStartRadius",
    type: "Select",
    options: borderRadiusAliasOrScales,
  },
  {
    prop: "borderStartEndRadius",
    type: "Select",
    options: borderRadiusAliasOrScales,
  },
  {
    prop: "borderWidth",
    type: "Select",
    options: borderWidthScales,
  },
  {
    prop: "borderBlockStartWidth",
    type: "Select",
    options: borderWidthScales,
  },
  {
    prop: "borderBlockEndWidth",
    type: "Select",
    options: borderWidthScales,
  },
  {
    prop: "borderInlineStartWidth",
    type: "Select",
    options: borderWidthScales,
  },
  {
    prop: "borderInlineEndWidth",
    type: "Select",
    options: borderWidthScales,
  },
  {
    prop: "color",
    type: "Select",
    options: colorTextAliases,
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "minHeight",
    type: "Text",
  },
  {
    prop: "minWidth",
    type: "Text",
  },
  {
    prop: "maxWidth",
    type: "Text",
  },
  {
    prop: "overflowX",
    type: "Text",
    options: overFlowOptions,
  },
  {
    prop: "overflowY",
    type: "Text",
    options: overFlowOptions,
  },
  {
    prop: "padding",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "paddingBlockStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "paddingBlockEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "paddingInlineStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "paddingInlineEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "role",
    type: "Select",
    options: boxRoleOptions,
  },
  {
    prop: "shadow",
    type: "Select",
    options: shadowScales,
  },
  {
    prop: "tabIndex",
    type: "Number",
  },
  {
    prop: "width",
    type: "Text",
  },
  {
    prop: "position",
    type: "Select",
    options: boxPositionOptions,
  },
  {
    prop: "insetBlockStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "insetBlockEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "insetInlineStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "insetInlineEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "opacity",
    type: "Text",
  },
  {
    prop: "outlineColor",
    type: "Select",
    options: colorBorderAliases,
  },
  {
    prop: "outlineStyle",
    type: "Select",
    options: boxLineStyleOptions,
  },
  {
    prop: "outlineWidth",
    type: "Select",
    options: borderWidthScales,
  },
  {
    prop: "printHidden",
    type: "Checkbox",
  },
  {
    prop: "visuallyHidden",
    type: "Checkbox",
  },
  {
    prop: "zIndex",
    type: "Text",
  },
];

export const BoxTailor = () => {
  // https://polaris.shopify.com/components/layout-and-structure/box
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/box"
      >
        Box
      </Link>

      <TailorList items={boxPropsItems} />
    </>
  );
};
