import { GridCellProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const gridCellPropsItems: PropItem<keyof GridCellProps>[] = [
  {
    prop: "columnSpan",
    type: "Complex",
  },
];

export const GridCellTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/grid"
      >
        Grid cell
      </DocLink>

      <TailorList items={gridCellPropsItems} />
    </>
  );
};
