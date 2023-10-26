import { ActionListProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

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
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/lists/action-list"
      >
        Action list
      </Link>

      <TailorList items={actionListPropsItems} />
    </>
  );
};
