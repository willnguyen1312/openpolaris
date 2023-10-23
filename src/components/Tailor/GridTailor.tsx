import { GridProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const gridPropsItems: PropItem<keyof GridProps>[] = [
  {
    prop: "columns",
    type: "Complex",
  },
];

export const GridTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/grid"
      >
        Grid
      </Link>

      <TailorList items={gridPropsItems} />
    </>
  );
};
