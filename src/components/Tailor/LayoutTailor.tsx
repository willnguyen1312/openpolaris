import { LayoutProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const layoutPropsItems: PropItem<keyof LayoutProps>[] = [
  {
    prop: "sectioned",
    type: "Checkbox",
  },
];

export const LayoutTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/layout"
      >
        Layout
      </DocLink>

      <TailorList items={layoutPropsItems} />
    </>
  );
};
