import { CheckboxProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const checkboxToneRecord: Record<NonNullable<CheckboxProps["tone"] | "">, 1> = {
  magic: 1,
  "": 1,
};

const checkboxToneOptions = Object.keys(checkboxToneRecord);

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
  {
    prop: "tone",
    type: "Select",
    options: checkboxToneOptions,
  },
];

export const CheckboxTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/checkbox"
      >
        Checkbox
      </DocLink>

      <TailorList items={checkboxPropsItems} />
    </>
  );
};
