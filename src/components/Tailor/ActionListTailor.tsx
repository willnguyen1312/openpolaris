import { ActionListProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const actionListPropsItems: PropItem<keyof ActionListProps>[] = [
  {
    prop: "items",
    type: "Complex",
  },
  {
    prop: "actionRole",
    type: "Text",
  },
  {
    prop: "allowFiltering",
    type: "Checkbox",
  },
  {
    prop: "sections",
    type: "Complex",
  },
];

export const ActionListTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/lists/action-list"
      >
        Action list
      </DocLink>

      <TailorList items={actionListPropsItems} />
    </>
  );
};
