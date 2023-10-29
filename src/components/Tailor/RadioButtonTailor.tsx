import { Link, RadioButtonProps } from "@shopify/polaris";
import { spacingScales } from "../../types";
import { PropItem, TailorList } from "./shared";

const radioButtonPropsItems: PropItem<keyof RadioButtonProps>[] = [
  {
    prop: "bleed",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "bleedBlockStart",
    type: "Select",
    options: spacingScales,
  },

  {
    prop: "bleedBlockEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "bleedInlineStart",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "bleedInlineEnd",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "ariaDescribedBy",
    type: "Text",
  },
  {
    prop: "label",
    type: "Text",
  },
  {
    prop: "labelHidden",
    type: "Checkbox",
  },
  {
    prop: "checked",
    type: "Checkbox",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "name",
    type: "Text",
  },
  {
    prop: "value",
    type: "Text",
  },
  {
    prop: "fill",
    type: "Checkbox",
  },
  {
    prop: "helpText",
    type: "Text",
  },
];

export const RadioButtonTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/radio-button"
      >
        Radio button
      </Link>

      <TailorList items={radioButtonPropsItems} />
    </>
  );
};
