import { Link } from "@shopify/polaris";
import { LayoutAnnotatedSectionProps } from "../../types";
import { PropItem, TailorList } from "./shared";

const layoutAnnotatedSectionPropsItems: PropItem<
  keyof LayoutAnnotatedSectionProps
>[] = [
  {
    prop: "description",
    type: "Text",
  },
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "id",
    type: "Text",
  },
];

export const LayoutAnnotatedSectionTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/layout"
      >
        Layout annotated section
      </Link>

      <TailorList items={layoutAnnotatedSectionPropsItems} />
    </>
  );
};
