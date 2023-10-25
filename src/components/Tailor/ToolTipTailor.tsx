import { Link, TooltipProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const tooltipPreferredPositionRecord: Record<
  NonNullable<TooltipProps["preferredPosition"] | "">,
  1
> = {
  above: 1,
  below: 1,
  mostSpace: 1,
  "": 1,
};
const tooltipPreferredPositionOptions = Object.keys(
  tooltipPreferredPositionRecord,
);

const tooltipWidthRecord: Record<NonNullable<TooltipProps["width"] | "">, 1> = {
  default: 1,
  wide: 1,
  "": 1,
};
const tooltipWidthOptions = Object.keys(tooltipWidthRecord);

const tooltipPaddingRecord: Record<
  NonNullable<TooltipProps["padding"] | "">,
  1
> = {
  default: 1,
  "400": 1,
  "": 1,
};
const tooltipPaddingOptions = Object.keys(tooltipPaddingRecord);

const tooltipBorderRadiusRecord: Record<
  NonNullable<TooltipProps["borderRadius"] | "">,
  1
> = {
  "100": 1,
  "200": 1,
  "": 1,
};
const tooltipBorderRadiusOptions = Object.keys(tooltipBorderRadiusRecord);

const tooltipPropsItems: PropItem<keyof TooltipProps>[] = [
  {
    prop: "content",
    type: "Text",
  },
  {
    prop: "active",
    type: "Checkbox",
  },
  {
    prop: "hoverDelay",
    type: "Number",
  },
  {
    prop: "dismissOnMouseOut",
    type: "Checkbox",
  },
  {
    prop: "preferredPosition",
    type: "Select",
    options: tooltipPreferredPositionOptions,
  },
  {
    prop: "activatorWrapper",
    type: "Text",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "width",
    type: "Select",
    options: tooltipWidthOptions,
  },
  {
    prop: "padding",
    type: "Select",
    options: tooltipPaddingOptions,
  },
  {
    prop: "borderRadius",
    type: "Select",
    options: tooltipBorderRadiusOptions,
  },
  {
    prop: "zIndexOverride",
    type: "Number",
  },
  {
    prop: "hasUnderline",
    type: "Checkbox",
  },
  {
    prop: "persistOnClick",
    type: "Checkbox",
  },
];

export const ToolTipTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/overlays/tooltip"
      >
        Tooltip
      </Link>

      <TailorList items={tooltipPropsItems} />
    </>
  );
};
