import { Link, TextFieldProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const textFieldVariantRecord: Record<
  NonNullable<TextFieldProps["variant"]> | "",
  1
> = {
  borderless: 1,
  inherit: 1,
  "": 1,
};

const textFieldTypeRecord: Record<NonNullable<TextFieldProps["type"]> | "", 1> =
  {
    "datetime-local": 1,
    currency: 1,
    date: 1,
    email: 1,
    integer: 1,
    number: 1,
    month: 1,
    password: 1,
    search: 1,
    tel: 1,
    text: 1,
    time: 1,
    url: 1,
    week: 1,
    "": 1,
  };

const textFieldAlignRecord: Record<
  NonNullable<TextFieldProps["align"]> | "",
  1
> = {
  center: 1,
  left: 1,
  right: 1,
  "": 1,
};

const textFieldInputModeRecord: Record<
  NonNullable<TextFieldProps["inputMode"]> | "",
  1
> = {
  decimal: 1,
  email: 1,
  none: 1,
  numeric: 1,
  search: 1,
  tel: 1,
  text: 1,
  url: 1,
  "": 1,
};

const textFieldPropsItems: PropItem<keyof TextFieldProps>[] = [
  {
    prop: "label",
    type: "Text",
  },
  {
    prop: "helpText",
    type: "Text",
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
    prop: "variant",
    type: "Select",
    options: Object.keys(textFieldVariantRecord),
  },
  {
    prop: "value",
    type: "Text",
  },
  {
    prop: "type",
    type: "Select",
    options: Object.keys(textFieldTypeRecord),
  },
  {
    prop: "autoComplete",
    type: "Text",
  },
  {
    prop: "align",
    type: "Select",
    options: Object.keys(textFieldAlignRecord),
  },
  {
    prop: "role",
    type: "Text",
  },
  {
    prop: "autoFocus",
    type: "Checkbox",
  },
  {
    prop: "connectedLeft",
    type: "Text",
  },
  {
    prop: "connectedRight",
    type: "Text",
  },
  {
    prop: "clearButton",
    type: "Checkbox",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "error",
    type: "Text",
  },
  {
    prop: "focused",
    type: "Checkbox",
  },
  {
    prop: "inputMode",
    type: "Select",
    options: Object.keys(textFieldInputModeRecord),
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
    prop: "largeStep",
    type: "Number",
  },
  {
    prop: "minLength",
    type: "Number",
  },
  {
    prop: "maxLength",
    type: "Number",
  },
  {
    prop: "monospaced",
    type: "Checkbox",
  },
  {
    prop: "multiline",
    type: "Checkbox",
  },
  {
    prop: "pattern",
    type: "Text",
  },
  {
    prop: "placeholder",
    type: "Text",
  },
  {
    prop: "prefix",
    type: "Text",
  },
  {
    prop: "suffix",
    type: "Text",
  },
  {
    prop: "suggestion",
    type: "Text",
  },
  {
    prop: "maxHeight",
    type: "Text",
  },
  {
    prop: "readOnly",
    type: "Checkbox",
  },
  {
    prop: "requiredIndicator",
    type: "Checkbox",
  },
  {
    prop: "selectTextOnFocus",
    type: "Checkbox",
  },
  {
    prop: "showCharacterCount",
    type: "Checkbox",
  },
  {
    prop: "spellCheck",
    type: "Checkbox",
  },
  {
    prop: "verticalContent",
    type: "Text",
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
    prop: "ariaOwns",
    type: "Text",
  },
  {
    prop: "ariaActiveDescendant",
    type: "Text",
  },
  {
    prop: "ariaAutocomplete",
    type: "Text",
  },
  {
    prop: "ariaControls",
    type: "Text",
  },
  {
    prop: "ariaExpanded",
    type: "Checkbox",
  },
];

export const TextFieldTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/text-field"
      >
        Text field
      </Link>

      <TailorList items={textFieldPropsItems} />
    </>
  );
};
