import { CardProps, Link } from "@shopify/polaris";
import {
  breakpointsAliases,
  colorBackgroundAliases,
  spacingScales,
} from "../../types";
import { PropItem, TailorList } from "./shared";

const cardPropsItems: PropItem<keyof CardProps>[] = [
  {
    prop: "background",
    type: "Select",
    options: colorBackgroundAliases,
  },
  {
    prop: "padding",
    type: "Select",
    options: spacingScales,
  },
  {
    prop: "roundedAbove",
    type: "Select",
    options: breakpointsAliases,
  },
];

export const CardTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/card"
      >
        Card
      </Link>

      <TailorList items={cardPropsItems} />
    </>
  );
};
