import { DescriptionListProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const descriptionListGapRecord: Record<
  NonNullable<DescriptionListProps["gap"] | "">,
  1
> = {
  tight: 1,
  loose: 1,
  "": 1,
};

const descriptionListPropsItems: PropItem<keyof DescriptionListProps>[] = [
  {
    prop: "items",
    type: "Complex",
  },
  {
    prop: "gap",
    type: "Select",
    options: Object.keys(descriptionListGapRecord),
  },
];

export const DescriptionListTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/lists/description-list"
      >
        Description list
      </DocLink>

      <TailorList items={descriptionListPropsItems} />
    </>
  );
};
