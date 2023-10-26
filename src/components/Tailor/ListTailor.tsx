import { Link, ListProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const listGapRecord: Record<NonNullable<ListProps["gap"] | "">, 1> = {
  loose: 1,
  extraTight: 1,
  "": 1,
};

const listTypeRecord: Record<NonNullable<ListProps["type"] | "">, 1> = {
  bullet: 1,
  number: 1,
  "": 1,
};

const listPropsItems: PropItem<keyof ListProps>[] = [
  {
    prop: "gap",
    type: "Select",
    options: Object.keys(listGapRecord),
  },
  {
    prop: "type",
    type: "Select",
    options: Object.keys(listTypeRecord),
  },
];

export const ListTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/lists/list"
      >
        List
      </Link>

      <TailorList items={listPropsItems} />
    </>
  );
};
