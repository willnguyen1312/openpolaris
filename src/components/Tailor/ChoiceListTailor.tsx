import { ChoiceListProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const choiceListPropsItems: PropItem<keyof ChoiceListProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "choices",
    type: "Complex",
  },
  {
    prop: "selected",
    type: "Complex",
  },
  {
    prop: "name",
    type: "Text",
  },
  {
    prop: "allowMultiple",
    type: "Checkbox",
  },
  {
    prop: "titleHidden",
    type: "Checkbox",
  },
  {
    prop: "error",
    type: "Text",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
];

export const ChoiceListTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/selection-and-input/choice-list"
      >
        Choice list
      </Link>

      <TailorList items={choiceListPropsItems} />
    </>
  );
};
