import { Link } from "@shopify/polaris";
import { LayoutSectionProps } from "../../types";
import { PropItem, TailorList } from "./shared";

const layoutSectionVariantRecord: Record<
  NonNullable<LayoutSectionProps["variant"] | "">,
  1
> = {
  fullWidth: 1,
  oneHalf: 1,
  oneThird: 1,
  "": 1,
};

const layoutSectionVariantOptions = Object.keys(
  layoutSectionVariantRecord,
) as NonNullable<LayoutSectionProps["variant"]>[];

const layoutSectionPropsItems: PropItem<keyof LayoutSectionProps>[] = [
  {
    prop: "variant",
    type: "Select",
    options: layoutSectionVariantOptions,
  },
];

export const LayoutSectionTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/layout"
      >
        Layout
      </Link>

      <TailorList items={layoutSectionPropsItems} />
    </>
  );
};
