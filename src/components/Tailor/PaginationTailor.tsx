import { Link, PaginationProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const paginationTypeRecord: Record<
  NonNullable<PaginationProps["type"] | "">,
  1
> = {
  page: 1,
  table: 1,
  "": 1,
};
const paginationTypeOptions = Object.keys(paginationTypeRecord);

const paginationPropsItems: PropItem<keyof PaginationProps>[] = [
  {
    prop: "nextTooltip",
    type: "Text",
  },
  {
    prop: "previousTooltip",
    type: "Text",
  },
  {
    prop: "nextURL",
    type: "Text",
  },
  {
    prop: "previousURL",
    type: "Text",
  },
  {
    prop: "hasNext",
    type: "Checkbox",
  },
  {
    prop: "hasPrevious",
    type: "Checkbox",
  },
  {
    prop: "accessibilityLabel",
    type: "Text",
  },
  {
    prop: "accessibilityLabels",
    type: "Complex",
  },
  {
    prop: "label",
    type: "Text",
  },
  {
    prop: "type",
    type: "Select",
    options: paginationTypeOptions,
  },
];

export const PaginationTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/navigation/pagination"
      >
        Pagination
      </Link>

      <TailorList items={paginationPropsItems} />
    </>
  );
};
