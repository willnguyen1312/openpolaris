import { Link, SelectProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const selectPropsItems: PropItem<keyof SelectProps>[] = [
  {
    prop: "options",
    type: "Complex",
  },
  {
    prop: "label",
    type: "Text",
  },
  {
    prop: "labelAction",
    type: "Complex",
  },
  {
    prop: "labelHidden",
    type: "Checkbox",
  },
  {
    prop: "labelInline",
    type: "Checkbox",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "helpText",
    type: "Text",
  },
  {
    prop: "placeholder",
    type: "Text",
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
    prop: "error",
    type: "Text",
  },
  {
    prop: "requiredIndicator",
    type: "Checkbox",
  },
];

export const SelectTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/select"
      >
        Select
      </Link>

      <TailorList items={selectPropsItems} />
    </>
  );
};
