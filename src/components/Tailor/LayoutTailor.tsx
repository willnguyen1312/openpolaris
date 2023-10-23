import { LayoutProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const layoutPropsItems: PropItem<keyof LayoutProps>[] = [
  {
    prop: "sectioned",
    type: "Checkbox",
  },
];

export const LayoutTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/layout"
      >
        Layout
      </Link>

      <TailorList items={layoutPropsItems} />
    </>
  );
};
