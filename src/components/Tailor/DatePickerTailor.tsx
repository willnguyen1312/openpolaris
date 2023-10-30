import { DatePickerProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const datePickerTailorPropsItems: PropItem<keyof DatePickerProps>[] = [
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "month",
    type: "Number",
  },
  {
    prop: "year",
    type: "Number",
  },
  {
    prop: "allowRange",
    type: "Checkbox",
  },
  {
    prop: "multiMonth",
    type: "Checkbox",
  },
  {
    prop: "weekStartsOn",
    type: "Number",
  },
  {
    prop: "dayAccessibilityLabelPrefix",
    type: "Text",
  },
];

export const DatePickerTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/date-picker"
      >
        Date picker
      </DocLink>

      <TailorList items={datePickerTailorPropsItems} />
    </>
  );
};
