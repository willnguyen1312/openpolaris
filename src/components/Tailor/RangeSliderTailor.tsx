import { Link, RangeSliderProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const rangeSliderPropsItems: PropItem<keyof RangeSliderProps>[] = [
  {
    prop: "label",
    type: "Text",
  },
  {
    prop: "labelHidden",
    type: "Checkbox",
  },
  {
    prop: "labelAction",
    type: "Complex",
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "value",
    type: "Number",
  },
  {
    prop: "min",
    type: "Number",
  },
  {
    prop: "max",
    type: "Number",
  },
  {
    prop: "step",
    type: "Number",
  },
  {
    prop: "output",
    type: "Checkbox",
  },
  {
    prop: "helpText",
    type: "Text",
  },
  {
    prop: "error",
    type: "Text",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "prefix",
    type: "Text",
  },
  {
    prop: "suffix",
    type: "Text",
  },
];

export const RangeSliderTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/range-slider"
      >
        Range slider
      </Link>

      <TailorList items={rangeSliderPropsItems} />
    </>
  );
};
