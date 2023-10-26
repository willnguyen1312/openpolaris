import { Link, ListboxProps } from "@shopify/polaris";
import { ListBoxOptionProps } from "../../types";
import { PropItem, TailorList } from "./shared";

const listBoxAutoSelectionRecord: Record<
  NonNullable<ListboxProps["autoSelection"] | "">,
  1
> = {
  FIRST: 1,
  FIRST_SELECTED: 1,
  NONE: 1,
  "": 1,
};

const listBoxPropsItems: PropItem<keyof ListboxProps>[] = [
  {
    prop: "autoSelection",
    type: "Select",
    options: Object.keys(listBoxAutoSelectionRecord),
  },
  {
    prop: "enableKeyboardControl",
    type: "Checkbox",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "customListId",
    type: "Text",
  },
];

export const ListBoxTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/lists/listbox"
      >
        List box
      </Link>

      <TailorList items={listBoxPropsItems} />
    </>
  );
};

const listBoxOptionPropsItems: PropItem<keyof ListBoxOptionProps>[] = [
  {
    prop: "value",
    type: "Text",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "disabled",
    type: "Checkbox",
  },
  {
    prop: "divider",
    type: "Checkbox",
  },
  {
    prop: "selected",
    type: "Checkbox",
  },
];

export const ListBoxOptionTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/lists/listbox"
      >
        List box option
      </Link>

      <TailorList items={listBoxOptionPropsItems} />
    </>
  );
};
