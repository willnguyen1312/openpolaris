import { CheckboxProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const checkboxPropsItems: PropItem<keyof CheckboxProps>[] = [
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
    prop: "name",
    type: "Text",
  },
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "value",
    type: "Text",
  },
  {
    prop: "labelClassName",
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
  {
    prop: "error",
    type: "Text",
  },
  {
    prop: "ariaControls",
    type: "Text",
  },
  {
    prop: "ariaDescribedBy",
    type: "Text",
  },
];

export const CheckboxTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/checkbox"
      >
        Checkbox
      </Link>

      <TailorList items={checkboxPropsItems} />
    </>
  );
};
