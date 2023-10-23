import { GridCellProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const gridCellPropsItems: PropItem<keyof GridCellProps>[] = [
  {
    prop: "columnSpan",
    type: "Complex",
  },
];

export const GridCellTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/grid"
      >
        Grid cell
      </Link>

      <TailorList items={gridCellPropsItems} />
    </>
  );
};
