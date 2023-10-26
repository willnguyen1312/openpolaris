import { Link, OptionListProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const optionListVerticalAlignRecord: Record<
  NonNullable<OptionListProps["verticalAlign"] | "">,
  1
> = {
  top: 1,
  center: 1,
  bottom: 1,
  "": 1,
};

const optionListPropsItems: PropItem<keyof OptionListProps>[] = [
  {
    prop: "id",
    type: "Text",
  },
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "options",
    type: "Complex",
  },
  {
    prop: "role",
    type: "Text",
  },
  {
    prop: "selected",
    type: "Complex",
  },
  {
    prop: "allowMultiple",
    type: "Checkbox",
  },
  {
    prop: "verticalAlign",
    type: "Select",
    options: Object.keys(optionListVerticalAlignRecord),
  },
  {
    prop: "sections",
    type: "Complex",
  },
];

export const OptionListTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/lists/option-list"
      >
        Option list
      </Link>

      <TailorList items={optionListPropsItems} />
    </>
  );
};
