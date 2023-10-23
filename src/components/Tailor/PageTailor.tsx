import { Link, PageProps } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const pagePropsItems: PropItem<keyof PageProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "subtitle",
    type: "Text",
  },
  {
    prop: "titleMetadata",
    type: "Text",
  },
  {
    prop: "additionalMetadata",
    type: "Text",
  },
  {
    prop: "compactTitle",
    type: "Checkbox",
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
  {
    prop: "narrowWidth",
    type: "Checkbox",
  },
  {
    prop: "titleHidden",
    type: "Checkbox",
  },
  {
    prop: "filterActions",
    type: "Checkbox",
  },
  {
    prop: "primaryAction",
    type: "Complex",
  },
  {
    prop: "secondaryActions",
    type: "Complex",
  },
  {
    prop: "backAction",
    type: "Complex",
  },
  {
    prop: "pagination",
    type: "Complex",
  },
  {
    prop: "actionGroups",
    type: "Complex",
  },
];

export const PageTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/page"
      >
        Page
      </Link>

      <TailorList items={pagePropsItems} />
    </>
  );
};
