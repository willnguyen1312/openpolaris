import { GridProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const gridPropsItems: PropItem<keyof GridProps>[] = [
  {
    prop: "columns",
    type: "Complex",
  },
];

export const GridTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/grid"
      >
        Grid
      </DocLink>

      <TailorList items={gridPropsItems} />
    </>
  );
};
