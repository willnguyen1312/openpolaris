import { EmptyStateProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const emptyStatePropsItems: PropItem<keyof EmptyStateProps>[] = [
  {
    prop: "heading",
    type: "Text",
  },
  {
    prop: "image",
    type: "Text",
  },
  {
    prop: "largeImage",
    type: "Text",
  },
  {
    prop: "imageContained",
    type: "Checkbox",
  },
  {
    prop: "fullWidth",
    type: "Checkbox",
  },
  {
    prop: "action",
    type: "Complex",
  },
  {
    prop: "secondaryAction",
    type: "Complex",
  },
  {
    prop: "footerContent",
    type: "Text",
  },
];

export const EmptyStateTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/layout-and-structure/empty-state"
      >
        Empty state
      </DocLink>

      <TailorList items={emptyStatePropsItems} />
    </>
  );
};
